export const snippets = [
  "print \"Hello, Perl!\\n\";",
  "my @nums = (1 .. 5);\nprint \"@nums\\n\";",
  "my %age = (ann => 31, bo => 25);\nprint $age{ann}, \"\\n\";",
  "foreach my $i (1 .. 10) {\n    print \"$i\\n\";\n}",
  "sub greet {\n    my ($name) = @_;\n    return \"Hello, $name!\";\n}\nprint greet(\"Perl\"), \"\\n\";",
  "open(my $fh, '<', 'data.txt') or die \"cannot open: $!\";\nwhile (my $line = <$fh>) {\n    chomp $line;\n    print uc($line), \"\\n\";\n}\nclose $fh;",
];
