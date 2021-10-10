import os

class app:
	name:str = "chat"
	path:str = os.path.join(os.getcwd(), "app")


class site:
	name = app.name
	origin:list = [
		"chat.io:*", "*.chat.io:*"
	]