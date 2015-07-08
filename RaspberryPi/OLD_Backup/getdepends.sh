sudo apt-get -y remove wolfram-engine
sudo apt-get -y install supervisor ser2net
sudo apt-get -y install libfreetype6 libfreetype6-dev libfreeimage3 
sudo apt-get -y install libfreeimage-dev libav-tools

sudo dpkg -i node_0.10.26-1_armhf.deb
sudo dpkg -i pwlibs1_1.7_armhf.deb
sudo dpkg -i pwomxplayer_20130815_armhf.deb

npm install openvg-canvas --save
