import uvicorn


uvicorn.run(
	"app.app:app", 
	host="0.0.0.0",
	port=5000,
	access_log=False
)
