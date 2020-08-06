def get_no_duplicates(array):
	return list(set(array))

def get_sorted(array):
	return sorted(array)

def get_no_escapes(array):
	return_array = []

	for element in array:
		return_array.append(element.strip())

	return return_array

def write_file(path, array):
	f = open(path, "w")
	
	for element in array:
		f.write(element + "\n")

	f.close()

path = "twitch-memes"

e = open(path).readlines()
e = get_no_escapes(e)
e = get_no_duplicates(e)
e = get_sorted(e)

write_file(path, e)