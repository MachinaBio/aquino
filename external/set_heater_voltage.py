import piplates.DAQCplate as DAQC
import argparse

ADDRESS = 0
CHANNEL = 0

parser = argparse.ArgumentParser(description='Set the voltage to run through the heaters.')
parser.add_argument(
        'voltage',
        help='The desired voltage to set.  Can range from 0 to 4.097.'
        )

args = parser.parse_args()
voltage = args.voltage

DAQC.setDAC(ADDRESS, CHANNEL, voltage)
