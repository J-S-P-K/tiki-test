from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

def conn():
    return psycopg2.connect(
        dbname="tortas_db",
        user="postgres",
        password="postgres",
        host="localhost"  # usar "db" si es Docker
    )

@app.route("/tortas", methods=["GET"])
def get_tortas():
    c = conn()
    cur = c.cursor()
    cur.execute("SELECT id, nombre, producto, detalles, precio FROM tortas;")
    data = cur.fetchall()
    c.close()
    return jsonify(data)

@app.route("/tortas", methods=["POST"])
def add_torta():
    d = request.json
    c = conn()
    cur = c.cursor()
    cur.execute(
        "INSERT INTO tortas (nombre, producto, detalles, precio) VALUES (%s, %s, %s, %s)",
        (d.get("nombre"), d.get("producto"), d.get("detalles"), d.get("precio"))
    )
    c.commit()
    c.close()
    return {"ok": True}

app.run(host="0.0.0.0", port=5000)