#!/usr/bin/python2.7
x="there are %d type of peope." %10
binary = "binary"
do_not = "don't"
y = "those who %s and those who %s." % (binary,do_not)

print x
print y

print "I said : %r." % x
print "I also said: '%s'." % y

hilarious = False
joke_evaluation = "Isn't that joke so funny?! %r"

print joke_evaluation % hilarious

w = "This is the left side of..."
e = "a string with a right side."

print w + e
