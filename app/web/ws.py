from typing import Dict
from fastapi import APIRouter, WebSocket
from fastapi.responses import HTMLResponse
from starlette.endpoints import WebSocketEndpoint
from starlette.types import Message, Receive, Scope, Send
from typing import Any, Dict
from fastapi.websockets import WebSocket

router = APIRouter()

html = """
<!DOCTYPE html>
<html>
	<head>
		<title>Chat</title>
	</head>
	<body>
		<h1>WebSocket Chat</h1>
		<form action="" onsubmit="sendMessage(event)">
			<input type="text" id="messageText" autocomplete="off"/>
			<button>Send</button>
		</form>
		<ul id='messages'>
		</ul>
		<script>
			var ws = new WebSocket("ws://localhost:5000/ws");
			ws.onmessage = function(event) {
				var messages = document.getElementById('messages')
				var message = document.createElement('li')
				var content = document.createTextNode(event.data)
				message.appendChild(content)
				messages.appendChild(message)
			};
			function sendMessage(event) {
				var input = document.getElementById("messageText")
				ws.send(input.value)
				input.value = ''
				event.preventDefault()
			}
		</script>
	</body>
</html>
"""

@router.get("/w")
async def get():
	return HTMLResponse(html)

connections = list()

class Echo(WebSocketEndpoint):
	encoding = 'text'

	def __init__(self, scope: Scope, receive: Receive, send: Send) -> None:
		super().__init__(scope, receive, send)
		# self.connections: Dict[str, callable]  = dict()

	async def on_connect(self, websocket: WebSocket):
		await websocket.accept()
		connections.append(websocket)

	async def on_receive(self, websocket:WebSocket, data:Any):
		# await websocket.send_text(f"Message text was: {data}")
		for _ws in connections:
			if _ws != websocket:
				await _ws.send_text(f"Message text was: {data}")

	async def on_disconnect(self, websocket:WebSocket, close_code:int):
		pass


router.add_websocket_route("/ws", Echo)