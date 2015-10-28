import piplates.DAQCplate as DAQC
import sched, time, datetime

ADDRESS = 0
CHANNEL = 0

def set_cycle():
    now = datetime.datetime.now()
    format_file = open('format')
    format = format_file.readlines()[0].strip()
    temperature = str(DAQC.getTEMP(ADDRESS, CHANNEL, format)) + ',' + format + ',' + str(now)
    print temperature
    temperature_file = open('temperature', 'w')
    temperature_file.write(temperature)
    temperature_file.close()
    s.enter(1, 1, set_cycle, ())


s = sched.scheduler(time.time, time.sleep)
s.enter(1, 1, set_cycle, ())
s.run()
