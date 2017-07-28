#!/bin/sh

# this script for automating the opencv installation process

=========================================================================
= Raspberry Pi 3 + Raspbian Jessie + OpenCV 3
= This script for python3 and OpenCV 3+ in Pi3
= If required any chnages please make the necessary changes in the script
=========================================================================

OPENCV_VERSION="3.2.0"
YES=""

echo "Updating OS..."
sudo raspi-config
sudo apt-get update
sudo apt-get upgrade
sudo rpi-update

echo "Removing wolfram"
sudo apt-get purge wolfram-engine

echo "Installing Build essential"
sudo apt-get install build-essential cmake pkg-config

echo "Installing imagae I/O pakages"
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev

echo "Installing Video I/O pakages"
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev

echo "Installing GTK dev lib"
sudo apt-get install libgtk2.0-dev

echo "Installing extra dependendencies"
sudo apt-get install libatlas-base-dev gfortran

echo "Installing Installing Python"
sudo apt-get install python2.7-dev python3-dev

echo "Installing Downloading OpenCV"
cd ~
wget -O opencv.zip https://github.com/Itseez/opencv/archive/${OPENCV_VERSION}.zip
unzip opencv.zip

wget -O opencv_contrib.zip https://github.com/Itseez/opencv_contrib/archive/${OPENCV_VERSION}.zip
unzip opencv_contrib.zip

echo "Installing pip"
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py

echo "Installing virtualenv"
sudo pip install virtualenv virtualenvwrapper
sudo rm -rf ~/.cache/pip

echo "Adding virtualenv to .profile"
echo -e "\n# virtualenv and virtualenvwrapper" >> ~/.profile
echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.profile
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.profile

echo "Source profile"
source ~/.profile

echo "Creating python virtualenv"
mkvirtualenv cv -p python3

workon cv

echo "Waiting for conformation!, Check you are in cv?"
echo "Press Y for continue"
read YES

if [ $YES = "Y" ] || [ $YES ="y" ]; then

   pip install numpy

   echo "CMake OpenCV"
   cd ~/opencv-${OPENCV_VERSION}/
   mkdir build
   cd build
   cmake -D CMAKE_BUILD_TYPE=RELEASE \
         -D CMAKE_INSTALL_PREFIX=/usr/local \
         -D INSTALL_PYTHON_EXAMPLES=ON \
         -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib-${OPENCV_VERSION}/modules \
         -D BUILD_EXAMPLES=ON ..

   echo "Waiting for conformation!, Check the Python3.4, Interpreter, numpy.. path configured."
   echo "Press Y for continue"
   read YES

   if [ $YES = "Y" ] || [ $YES ="y" ]; then
 
      echo "starting make, This might take few hours..."
      make -j4

      echo "Waiting for conformation!"
      echo "Press Y for continue"
      read YES

      if [ $YES = "Y" ] || [ $YES ="y" ]; then
   
         echo "Make install"
         sudo make install
         sudo ldconfig
         
         echo "OpenCV installation almost completed"
         echo "check this!....."
	 ls -l /usr/local/lib/python3.4/site-packages/
         echo "Mostly you see this...cv2.cpython-34m.so"
         cd /usr/local/lib/python3.4/site-packages/
         sudo mv cv2.cpython-34m.so cv2.so 
         cd ~/.virtualenvs/cv/lib/python3.4/site-packages/
         ln -s /usr/local/lib/python3.4/site-packages/cv2.so cv2.so
         echo "All done"
         echo "Open up a new terminal, execute the source and workon cv"
         echo "python"
         echo "import cv2"
         echo "cv2.__version__"
         echo "It should be resulted 3.2.0"
         echo "If OpenCV installed correctly you can remove opencv folder, it can free up few GBs!"
         echo "Try this, rm -rf opencv-3.1.0 opencv_contrib-3.1.0"
         echo "Thank you."
      else
         echo "if your make seems to be FAILED!"
         echo "then do the below commands and restart the make process again"
         echo "make clean"
         echo "make"
      fi

  else
     echo "You Cancelled, Start the CMake again!"
     echo "Remove the build folder and recreate the same and restart the process"
     echo "IMP: make sure you are in cv, if not source profile again"
     exit
  fi
   
else
   echo "Check source .profile, Please run workon cv and proceed"   
fi

#end





