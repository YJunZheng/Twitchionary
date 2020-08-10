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
		f.write(element)

	f.close()

def write_js(array, var_name):
	f = open("keywords.js", "a")

	f.write("var " + var_name + " = [")

	for i in range(len(array)):
		f.write('"' + array[i].strip())
		if not (i + 1 == len(array)):
			f.write('", ')

	f.write('"];\n')

file = "keywords.js"

open(file, 'w').close()

write_file("twitch-emotes", get_sorted(get_list("twitch-emotes")))
write_file("bttv-ffz-emotes", get_sorted(get_list("bttv-ffz-emotes")))
write_file("streamers", get_sorted(get_list("streamers")))
write_file("video-games", get_sorted(get_list("video-games")))
write_file("twitch-memes", get_sorted(get_list("twitch-memes")))

write_js(get_sorted(get_list("twitch-emotes")), "twitchEmotes")
write_js(get_sorted(get_list("bttv-ffz-emotes")), "BTTVFFZEmotes")
write_js(get_sorted(get_list("streamers")), "streamers")
write_js(get_sorted(get_list("video-games")), "videoGames")
write_js(get_sorted(get_list("twitch-memes")), "twitchMemes")

open(file, "a").write('\
var promptPool = {\
	"twitch-emotes" : [document.getElementById("twitch-emotes").checked, twitchEmotes],\
	"bttv-ffz-emotes" : [document.getElementById("bttv-ffz-emotes").checked, BTTVFFZEmotes],\
	"streamers" : [document.getElementById("streamers").checked, streamers],\
	"video-games" : [document.getElementById("video-games").checked, videoGames],\
	"twitch-memes" : [document.getElementById("twitch-memes").checked, twitchMemes]\
};\
')