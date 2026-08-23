# import time
import os
# from typing import Annotated
from fastapi import FastAPI, File, UploadFile
import uuid
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse


app = FastAPI()

path_dir = "./images"
os.makedirs(path_dir, exist_ok=True)

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    path = os.path.join(path_dir, unique_filename)
    contents = await file.read()
    with open(path, "wb") as fp:
        fp.write(contents)

    return {"filename": file.filename,
            "content_type": file.content_type}
