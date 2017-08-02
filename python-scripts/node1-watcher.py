import time
import RPi.GPIO as GPIO
import subprocess
import select
import asyncio

print("Preparing to tail log with subprocess..")
f = subprocess.Popen(['tail','-F',"/home/jmotacek/hyperledger-pi-composer/logs/peer0org1log.txt"],\
    stdout=subprocess.PIPE,stderr=subprocess.PIPE)
p = select.poll()
p.register(f.stdout)

print("Setting up GPIO...")
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT) # Peer 0 Green
GPIO.setup(17,GPIO.OUT) # Peer 0 Amber
GPIO.setup(27,GPIO.OUT) # Peer 0 Red
GPIO.setup(5,GPIO.OUT) # Peer 1 Green
GPIO.setup(6,GPIO.OUT) # Peer 1 Amber

#@asyncio.coroutine
def blink():
    GPIO.output(18,GPIO.HIGH)
    yield from asyncio.sleep(0.01)
    GPIO.output(18,GPIO.LOW)

print("Starting aync loop...")
#loop = asyncio.get_event_loop()
#loop.run_forever()
while True:
    if p.poll(1):
        line = f.stdout.readline()
        print(line)
        print("***")
        #asyncio.ensure_future(blink())
        # Flip Amber light on when chain code is installed
        if 'chaincode canonical name: mycc:1.0' in line:
            GPIO.output(17,GPIO.HIGH)
        # Flip red on when identified as an anchor peer
        if 'Anchor peers for org Org1MSP are anchor_peers:<host:"peer0.org1.example.com"' in line:
            GPIO.output(27,GPIO.HIGH)
    time.sleep(1)
        

# Catch keyboard exists and kill the lights
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Stopping")
    loop.stop()
    loop.close()
    GPIO.output(18,GPIO.LOW)
    GPIO.output(17,GPIO.LOW)
    GPIO.output(27,GPIO.LOW)
    GPIO.output(5,GPIO.LOW)
    GPIO.output(6,GPIO.LOW)