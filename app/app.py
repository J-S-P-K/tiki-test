from flask import Flask, jsonify, request
import psycopg2
import time

app = Flask(__name__)

def conn():
    for _ in range(10):
        try:
            return psycopg2.connect(
                dbname="tortas_db",
                user="postgres",
                password="postgres",
                host="db"
            )
        except:
            time.sleep(2)
    raise Exception("DB no disponible")

@app.route("/tortas", methods=["GET"])
def get_tortas():
    try:
        c = conn()
        cur = c.cursor()
        cur.execute("SELECT id, nombre, producto, detalles, precio FROM tortas;")
        data = cur.fetchall()
        cur.close()
        c.close()
        return jsonify(data)
    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/tortas", methods=["POST"])
def add_torta():
    c = None
    try:
        d = request.json

        if not d:
            return {"error": "sin datos"}, 400

        c = conn()
        cur = c.cursor()

        cur.execute(
            "INSERT INTO tortas (nombre, producto, detalles, precio) VALUES (%s, %s, %s, %s)",
            (d.get("nombre"), d.get("producto"), d.get("detalles"), d.get("precio"))
        )

        c.commit()
        cur.close()
        c.close()

        return {"ok": True}

    except Exception as e:
        if c:
            c.rollback()
        return {"error": str(e)}, 500

app.run(host="0.0.0.0", port=5000)