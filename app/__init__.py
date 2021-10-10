import logging
from app.constants import app

path = app.path

logging.basicConfig(level=logging.DEBUG, filename=f"{path}/files/site.log", filemode="a",
	format="%(asctime)s - %(filename)s:%(lineno)d - %(levelname)s - %(message)s")