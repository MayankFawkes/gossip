from functools import wraps
import logging
logg = logging.getLogger(__name__)
BOTS = [
	"Googlebot",
	"Bingbot",
	"Slurp",
	"DuckDuckBot",
	"Baiduspider",
	"YandexBot",
	"ia_archiver",
	"Discordbot",
	"Twitterbot",
	"Bot",
	"Robot",
	"Yandex",
	"Google",
	"bing"
]

def is_bot(func):
	@wraps(func)
	async def inner(*args, **kwargs):
		print(kwargs)
		req = kwargs.get("request")
		agent = req.headers.get("user-agent").lower()
		if not agent:
			kwargs["robot"] = True
			logg.debug(f"useragent: {agent} | bot: True")
			return await func(*args, **kwargs)
		
		for bot in BOTS:
			if bot.lower() in agent:
				kwargs["robot"] = True
				logg.debug(f"useragent: {agent} | bot: True")
				return await func(*args, **kwargs)

		if len(agent.split()) == 1:
			kwargs["robot"] = True

		logg.debug(f"useragent: {agent} | bot: {kwargs['robot']}")
		return await func(*args, **kwargs)
	return inner


def is_bot_exce(func):
	@wraps(func)
	async def inner(*args, **kwargs):
		req = args[0]
		agent = req.headers.get("user-agent").lower()
		if not agent:
			kwargs["robot"] = True
			logg.debug(f"useragent: {agent} | bot: True")
			return await func(*args, **kwargs)
		for bot in BOTS:
			if bot.lower() in agent:
				kwargs["robot"] = True
				logg.debug(f"useragent: {agent} | bot: True")
				return await func(*args, **kwargs)

		if len(agent.split()) == 1:
			kwargs["robot"] = True
		
		logg.debug(f"useragent: {agent} | bot: {kwargs['robot']}")
		return await func(*args, **kwargs)
	return inner