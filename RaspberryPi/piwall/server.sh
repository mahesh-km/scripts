#!/bin/sh

#avconv -re -i camera_mirror.mp4 -vcodec copy -f mp4 -an udp://239.0.1.23:1234
avconv -re -i drop.avi -vcodec copy -f mp4 -an udp://239.0.1.23:1234
