#!/bin/sh

# This program sets up a few configuration parameters required for VMC
#
#
#
tar xvf app.tar

echo "Increasing swap space to 500MB..."
echo "CONF_SWAPSIZE=500" > ~/dphys-swapfile
sudo cp /etc/dphys-swapfile /etc/dphys-swapfile.bak
sudo mv ~/dphys-swapfile /etc/dphys-swapfile

echo "Adding player to autostart (via Supervisord)"
sudo ln -s ~/player/player.conf /etc/supervisor/conf.d/player.conf
echo "Adding pplayer to autostart (via Supervisord)"
sudo ln -s ~/pplayer/pplayer.conf /etc/supervisor/conf.d/pplayer.conf
echo "Adding tinfo to autostart (via Supervisord)"
sudo ln -s ~/tinfo/tinfo.conf /etc/supervisor/conf.d/tinfo.conf
echo "Adding master to autostart (via Supervisord)"
sudo ln -s ~/master/master.conf /etc/supervisor/conf.d/master.conf

sudo /etc/init.d/supervisor stop > /dev/null
sudo /etc/init.d/supervisor start > /dev/null

# Disable Blanking of screen
if grep -q BLANK_TIME /etc/kbd/config; then
  sudo sed 's/^BLANK_TIME.*/BLANK_TIME=0/' -i /etc/kbd/config
else
  echo 'BLANK_TIME=0' | sudo tee -a /etc/kbd/config > /dev/null
fi

# Disable power down
if grep -q POWERDOWN_TIME /etc/kbd/config; then
  sudo sed 's/^POWERDOWN_TIME.* /POWERDOWN_TIME=0/' -i /etc/kbd/config
else
  echo 'POWERDOWN_TIME=0' | sudo tee -a /etc/kbd/config > /dev/null
fi

# Increase gpu memory 
if grep -q gpu_mem /boot/config.txt; then
  sudo sed 's/^gpu-mem.*/gpu_mem=256/' -i /boot/config.txt
else
  echo 'gpu_mem=256' | sudo tee -a /boot/config.txt > /dev/null
fi



# Increase frame buffer 
if grep -q framebuffer_depth /boot/config.txt; then
  sudo sed 's/^framebuffer_depth.*/framebuffer_depth=32/' -i /boot/config.txt
else
  echo 'framebuffer_depth=32' | sudo tee -a /boot/config.txt > /dev/null
fi

#bug fix in frame buffer
if grep -q framebuffer_ignore_alpha /boot/config.txt; then
  sudo sed 's/^framebuffer_ignore_alpha.*/framebuffer_ignore_alpha=1/' -i /boot/config.txt
else
  echo 'framebuffer_ignore_alpha=1' | sudo tee -a /boot/config.txt > /dev/null
fi

#set the orientation to 90 degrees
#display_rotate=1        90 degrees
#display_rotate=3        270 degrees
if grep -q display_rotate /boot/config.txt; then
  sudo sed 's/^display_rotate.*/display_rotate=1/' -i /boot/config.txt
else
  echo 'display_rotate=1' | sudo tee -a /boot/config.txt > /dev/null
fi

sudo reboot
