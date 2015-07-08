#!/usr/bin/perl

#
#
#
use strict;
use Data::Dumper;

#
#
#
our $script_dir = "$0";

if ($script_dir =~ m!/!g) { $script_dir =~ s!(.*)/(.*)!$1!g;        }
else                      {                      $script_dir = "."; }


#
#
#
our $display_x_offset           = 0;
our $display_y_offset           = (int(1280/4))*3;
our $display_width              = 1024;
our $display_height             = int(1280/3);

#
#
#
our $screen_name = "";

if ($ARGV[0] eq "screen1") {
    $ENV{'DISPLAY'} = ":0.0";
    $screen_name = "screen1";
}
elsif ($ARGV[0] eq "screen2") {
    $screen_name = "screen2";
    $ENV{'DISPLAY'} = ":0.0";


    our $display_x_offset           = 1024;
}
else {
    die "usage: $0 (screen1|screen2)\n";
}

my $pid_file = "$script_dir/../logs/play-ticket-screens-${screen_name}.pid";

#
#
#
open(PIDOUT, "> $pid_file") || die "could not write to $pid_file: $!";
print PIDOUT "$$";
close(PIDOUT);


#
#
#
open(TT, "$script_dir/../config/ticketing_type");
our $ticketing_type = <TT>;
chomp($ticketing_type);

#
#
#
if ( ($ticketing_type ne "prs") && ($ticketing_type ne "uts") && ($ticketing_type ne "uts-db") ) {
    die "invalid ticketing type: $ticketing_type";
}

#
#
#
our $base_dir     = "$script_dir/..";
our $type_dir     = "$base_dir/$ticketing_type";
our $livedata_dir = "$type_dir/$screen_name/livedata";
our $debug        = $ENV{'DEBUG'} ? 1 : undef;

#
#
#
my $datastream = {};

#
# open the browser 
#
my $browser_cmd = "uzbl-core -c /home/vyoma/.config/uzbl/config -g ${display_width}x${display_height}+${display_x_offset}+${display_y_offset} http://localhost/$screen_name/vyoma-${ticketing_type}.html";
system("$browser_cmd");

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

