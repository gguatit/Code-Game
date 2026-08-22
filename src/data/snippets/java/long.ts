export const snippets = [
  "class Counter implements Runnable {\n  private int count = 0;\n\n  public synchronized void increment() {\n    count++;\n  }\n\n  public int get() {\n    return count;\n  }\n}",
  "List<String> upper = names.stream()\n    .filter(name -> !name.isBlank())\n    .map(String::toUpperCase)\n    .sorted()\n    .collect(Collectors.toList());",
  "try (BufferedReader reader = Files.newBufferedReader(path)) {\n  String line;\n  while ((line = reader.readLine()) != null) {\n    System.out.println(line.trim());\n  }\n} catch (IOException e) {\n  e.printStackTrace();\n}",
];
