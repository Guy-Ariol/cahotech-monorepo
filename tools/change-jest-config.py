# Read in the file
with open(r'D:\_Napata\dev\apps\cahotech-monorepo\jest.config.js', 'r') as file:
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('"append": false', '"append": true')

# Write the file out again
with open(r'D:\_Napata\dev\apps\cahotech-monorepo\jest.config.js', 'w') as file:
  file.write(filedata)


# clear up test report
open(r'D:\_Napata\dev\apps\cahotech-monorepo\unit-test-report.html', 'w').close()
