#!/usr/bin/perl

use strict;
use warnings;

open(my $in, "<" , "example.txt") or die "cannot open file";
while (my $line = <$in>){
    my @a = split(/ /, $line)
    foreach my $b (@a) {
        print "$b\n"
    }
}
close($in);