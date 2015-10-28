import piplates.DAQCplate as DAQC
import sched, time, datetime

ADDRESS = 0
CHANNEL = 0

def set_cycle():
    now = datetime.datetime.now()
    voltage_file = open('voltage')
    format_file = open('format)
    voltage = float(voltage_file.readlines()[0])
    format = format_file.readlines()[0].strip()
    temperature = str(DAQC.getTEMP(ADDRESS, CHANNEL, format)) + ',' + format + ',' + str(now)
    temperature_file = open('temperature', 'w')
    temperature_file.write(temperature)
    temperature_file.close()
    print 'Voltage: ' + voltage
    print 'Temperature: ' + temperature
    DAQC.setDAC(ADDRESS, CHANNEL, voltage)
    s.enter(1, 1, set_cycle, ())


s = sched.scheduler(time.time, time.sleep)
s.enter(1, 1, set_cycle, ())
s.run()

