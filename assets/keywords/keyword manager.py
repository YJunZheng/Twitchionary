def get_no_duplicates(array):
	return list(set(array))

def get_sorted(array):
	return sorted(array)

def get_no_escapes(array):
	return_array = []

	for element in array:
		return_array.append(element.strip())

	return return_array

def get_list(path):
	return open(path).readlines()

def write_file(path, array):
	f = open(path, "w")
	
	for element in array:
		f.write(element + "\n")

	f.close()

def write_js(array, var_name):
	f = open("keywords.js", "a")

	f.write("var " + var_name + " = [")

	for i in range(len(array)):
		f.write('"' + array[i].strip())
		if not (i + 1 == len(array)):
			f.write('", ')

	f.write('"];\n')
	
write_js(get_list("twitch-emotes"), "twitchEmotes")
write_js(get_list("bttv-ffz-emotes"), "bttvFFZEmotes")
write_js(get_list("streamers"), "streamers")
write_js(get_list("video-games"), "videoGames")
write_js(get_list("twitch-memes"), "twitchMemes")