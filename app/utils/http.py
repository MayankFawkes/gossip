import aiohttp, aiofiles
from bs4 import BeautifulSoup
from constants import adultxyz, domain, workers
from io import BytesIO

class response(object):
	def __init__(self, resp:aiohttp.client_reqrep.ClientResponse, raw_text:str):
		self._headers = dict(resp.headers)
		self._history = resp.history
		self._status_code = resp.status
		self._url = resp.url
		self._raw_text = raw_text
		self._resp = resp

	async def json(self, content_type=None):
		return await self._resp.json(content_type=content_type)

	@property
	def headers(self):
		return self._headers

	@property
	def history(self):
		return self._history

	@property
	def status_code(self):
		return self._status_code

	@property
	def url(self):
		return self._url

	def text(self, encoding="utf-8"):
		return self._raw_text.decode(encoding)
	
	@property
	def raw_text(self):
		return self._raw_text
	
	def get_bytes(self):
		return BytesIO(bytearray(self.raw_text))
	
	async def save(self, filename:str):
		async with aiofiles.open(filename, mode='wb') as file:
			await file.write(self.raw_text)


async def request(method:str, *args, **kwargs):
	async with aiohttp.request(method, *args, **kwargs) as resp:
		return response(resp, await resp.read())

async def get(*args, **kwargs):
	return await request("GET", *args, **kwargs)

async def post(*args, **kwargs):
	return await request("POST", *args, **kwargs)

async def get_byte_object(*args, **kwargs):
	response = await get(*args, **kwargs)
	if response.status_code == 404:
		return
	return response.get_bytes()


def filter(val:str, high:bool=True) -> str:
	if high:
		return val.lower().replace("pornhub.com", domain.full_name).replace("pornhub", domain.name)
	return val.replace("pornhub.com", domain.full_name).replace("pornhub", domain.name)

async def get_data(path:str) -> dict:
	url = "https://pornhub.com" + path
	req = await get(url=url)
	soup = BeautifulSoup(req.text, "lxml")
	data = {
		"title": "",
		"og": {}
	}

	data["og"]["title"] = filter(soup.title.string)
	data["title"] = filter(soup.title.string)

	for tag in soup.find_all("meta", {"property":"og:url"}):
		data["og"]["url"] = tag.get("content")

	for tag in soup.find_all("meta", {"property":"og:image"}):
		data["og"]["image"] = tag.get("content")

	for tag in soup.find_all("meta", {"name":"description"}):
		data["og"]["description"] = filter(tag.get("content"))
		data["description"] = filter(tag.get("content"))

	return data


async def shorten(path:str) -> str:
	headers = {'User-Agent': 'Basic Agent', 'Content-Type': 'application/x-www-form-urlencoded'}
	data = {
		"url":f"https://www.pornhub.com{path}",
		"_user_id": adultxyz.user_id,
		"_api_key": adultxyz.api_key
	}
	
	url = "https://api.adult.xyz/v1/shorten"

	req = await post(url=url, data=data, headers=headers)
	print(await req.json())
	return (await req.json())["data"][0].get("short_url")

async def is_alive(domain:str):
	url = domain + "/pingworker"
	resp = await get(url=url)
	if resp.status_code == 200:
		return True
	return False

from html import unescape
async def data(path:str) -> dict:
	for worker in workers.metas:
		if not await is_alive(worker):
			continue
		url = worker + path
		resp = await get(url=url)
		return await resp.json()
	return await get_data(path=path)


async def get_data_xml(path:str):
	url = "https://pornhub.com" + path
	req = await get(url=url)
	return filter(req.text, high=False)

async def xml(path:str) -> str:
	for worker in workers.xmls:
		if not await is_alive(worker):
			continue
		path = worker + path
		resp = await get(url=path)
		return resp.text
	return await get_data_xml(path=path)