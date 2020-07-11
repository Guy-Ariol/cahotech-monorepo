# Read in the file
with open(r'D:\_Napata\dev\apps\cahotech-monorepo\apps\chimmo-native\www\index.html', 'r') as file:
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('type="module"', '')
filedata = filedata.replace('/"', './"')

# Write the file out again
with open(r'D:\_Napata\dev\apps\cahotech-monorepo\apps\chimmo-native\www\index.html', 'w') as file:
  file.write(filedata)
