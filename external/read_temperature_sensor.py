import piplates.DAQCplate as DAQC
import argparse

ADDRESS = 0
CHANNEL = 0

parser = argparse.ArgumentParser(description='Read the current temperature from the sensors.')
parser.add_argument(
    'format',
    default='f',
    nargs='?',
    choices=['f', 'c', 'k'],
    help='The desired temperature format: "f" for Farenheit, "c" for Celsius/Centigrade, "k" for Kelvin'
    )

args = parser.parse_args()
format = args.format

temperature = DAQC.getTEMP(ADDRESS, CHANNEL, format);

print temperature
