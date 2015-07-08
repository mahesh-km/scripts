#!/usr/bin/perl

#
# plays the ads in the media directory
#

#
#
#
use strict;
use FileHandle;
use Data::Dumper;

#
#
# 
$SIG{TERM} = \&sigterm_handler;

#
#
#
our $script_dir = "$0";

if ($script_dir =~ m!/!g) { $script_dir =~ s!(.*)/(.*)!$1!g;        }
else                      {                      $script_dir = "."; }

#
#
#
our $base_dir = "$script_dir/..";
our $debug    = $ENV{'DEBUG'} ? 1 : undef;

#
#
#
our $default_image_display_time = 10;

our $display_x_offset           = 0;
our $display_y_offset           = 0;
our $display_width              = 1024;
our $display_height             = int((1280/100)*70);
our $screen_name                = undef;

#
#
#
if ($ARGV[0] eq "screen1") {
    $ENV{'DISPLAY'} = ":0.0";
    $screen_name = "screen1";
}
elsif ($ARGV[0] eq "screen2") {
    $screen_name = "screen2";
    $ENV{'DISPLAY'} = ":0.0";
    # $display_y_offset = int(($display_height/2)*3);
    our $display_x_offset           = 1024;
    our $display_width              = 1024;

}
else {
    die "usage: $0 (screen1|screen2)\n";
}

#
#
#
my $media_dir = "$base_dir/media";
my $logfile   = "$base_dir/logs/audit-${screen_name}.log";
my $pid_file = "$script_dir/../logs/play-ads-${screen_name}.pid";

#
#
#
open(PIDOUT, "> $pid_file") || die "could not write to $pid_file: $!";
print PIDOUT "$$";
close(PIDOUT);
#
#
#############################################################################################################################################
my $video_viewer_options = undef;

#$script_dir/../config/filename
open(TT, "$script_dir/../config/livecdmode");
our $livecd_mode =  <TT>;
chomp($livecd_mode);


if ($livecd_mode eq "nonsync" )
{
  
     $video_viewer         = "cvlc";
     $video_viewer_options = "--logfile $base_dir/logs/vlc.log --logmode text --log-verbose 2 --no-audio --width $display_width --height $display_height --video-x $display_x_offset --video-y $display_y_offset --play-and-exit --qt-minimal-view --no-video-deco --no-video-title-show";

}

elsif ($livecd_mode eq "sync" )
{
    $video_viewer         = "mplayer";

    if( $screen_name eq "screen2")
    {
        die("screen 2 not supported  "); 
    }

    open(TY, "$script_dir/../config/playermode");
    our $player_mode =  <TY>;
    chomp($player_mode);

    if( $player_mode eq "master" )
    {
         $video_viewer_options = "-screenw 1024 -screenh 960 -geometry 50%:0% -osdlevel 0 -noconsolecontrols -nosound -noborder -nolirc -udp-master -udp-ip 192.168.1.255";
    }
    elsif ( $player_mode eq "slave" )
    {
         $video_viewer_options = "-screenw 1024 -screenh 960 -geometry 50%:0% -osdlevel 0 -noconsolecontrols -nosound -noborder -nolirc -udp-slave";
    } 
}

######################################################################################################################################################
my $flash_viewer         = "gnash";
my $flash_viewer_options = "--once --width $display_width --height $display_height --x-pos $display_x_offset --y-pos $display_y_offset --hide-menubar";
my $image_viewer         = "xloadimage";
my $image_viewer_options = "-geometry ${display_width}x${display_height}+${display_x_offset}+${display_y_offset}";


## Another addition by abhinav.
my $get_file_name	= "$script_dir/get_file_name.sh";

#
open(CLK, "$script_dir/../config/clock");
our $clock =  <CLK>;
chomp($clock);

#
while (1) {
    #
    if($clock eq "on")
	{
	my $sec = "1";
	while($sec ne 60)
	{
	my $browser_cmd = "uzbl-core -c /home/vyoma/.config/uzbl/config -g ${display_width}x${display_height}+${display_x_offset}+${display_y_offset} http://localhost/$screen_name/Vyoma_Clock.html";
	system("$browser_cmd");
	$sec++;
	}
	#system("pkill -9 $browser_cmd");
	}
    else
 	{
    # re-read the media directory every time as the files might have changed as part of the new media copy/update process... 
    #
    

    opendir(MEDIA_FILES, "$media_dir") || die "could not open media directory ($media_dir): $!";
    my @not_sorted_media_files = sort readdir(MEDIA_FILES);
    my @media_files = sort { $a <=> $b } @not_sorted_media_files;
    #print @media_files;

    #
    #
    #
    foreach my $filename (@media_files) {
      next if ($filename =~ /^\./);

      my $result           = "";
      my $playline         = "";
      my $filetype         = &filetype($filename);
      my $display_for_secs = undef;

      if ($filetype =~ /^(mpg|mpeg)$/i)
	 {
         $playline = "$video_viewer $video_viewer_options \"$media_dir/$filename\"";
      	 }
      else 
	{
        &log("unknown file type for file $filename - cannot play");
        next;
	}
      }

      #
      #
      #
      my $link_filename = `$get_file_name $filename`;
      &log("starting to play: $link_filename");
      &debug("playline is: $playline");



      #
      #
      #
      if ($display_for_secs) {
        eval {
            local $SIG{ALRM} = sub { die "alarm\n" }; # NB: \n required
            alarm($display_for_secs);
            &debug("set alarm - about to load image");
            $result = `$playline`;
            alarm(0);
        };
            &debug("out of eval...");
            system("pkill -9 $image_viewer");
      }
      else {
        $result = `$playline`;
      }

      #
      #
      #
      &log("finished playing: $link_filename");
    }
    &log("a full cycle of all media files finished");
}


#
#
#
sub filetype {
  my $filename = shift;
  my ($basename, $ext) = split(/\./, $filename, 2); 
  return lc($ext);
}

#
#
#
sub log {
  my $msg = shift;
  my $timenow = scalar localtime;

  if (! open(LOG, ">> $logfile")) {
    warn "could not open $logfile for writing: $!";
    return undef;
  }

  #
  #
  LOG->autoflush(1);

  #
  #
  print LOG "[$timenow] $msg\n";
  close(LOG);
}


#
#
#
sub debug {
  my $msg = shift;
  my $timenow = scalar localtime;

  #
  #
  #
  return if (! $debug);

  #
  #
  #
  warn "debug: [$timenow] $msg\n";
}

#
#
#
sub sigterm_handler {
    my $sig = shift;
}
