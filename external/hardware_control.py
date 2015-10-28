import sys
import piplates.DAQCplate as DAQC
import sched, time, datetime

ADDRESS = 0
CHANNEL = 0

def set_cycle():
    try:
        now = datetime.datetime.now()
        voltage_file = open('voltage')
        format_file = open('format')
        voltage = float(voltage_file.readlines()[0])
        format = format_file.readlines()[0].strip()
        temperature = str(DAQC.getTEMP(ADDRESS, CHANNEL, format)) + ',' + format + ',' + str(now)
        voltage_read = str(DAQC.getDAC(0,0))
        voltage_read_file = open('voltage_read', 'w')
        voltage_read_file.write(voltage_read)
        voltage_read_file.close()
        temperature_file = open('temperature', 'w')
        temperature_file.write(temperature)
        temperature_file.close()
        print 'Voltage Set: ' + str(voltage)
        print 'Voltage Read: ' + voltage_read
        print 'Temperature: ' + temperature
        DAQC.setDAC(ADDRESS, CHANNEL, voltage)
        s.enter(1, 1, set_cycle, ())
    except:
        print "Unexpected error:", sys.exec_info()[0]


s = sched.scheduler(time.time, time.sleep)
s.enter(1, 1, set_cycle, ())
s.run()

