from concurrent.futures import ThreadPoolExecutor
import json
import requests

"""
Credits to https://github.com/ceo-py for help with this script
"""

url = "https://script.google.com/macros/s/AKfycbxNu27V2Y2LuKUIQMK8lX1y0joB6YmG6hUwB1fNeVbgzEh22TcDGrOak03Fk3uBHmz-/exec"


def get_devices():
    results = requests.request("GET", f"{url}?route=device-list")
    with open(
        "./server/databaseLoad/rawData/device_list.json", "w", encoding="utf-8"
    ) as x:
        json.dump(results.json(), x)


def read_url(info):
    payload, headers = (
        f'{{\n    "route": "device-detail",\n    "key": "{info}"\n}}',
        {},
    )
    return requests.request("POST", url, headers=headers, data=payload)


def get_data():
    results, executor = [], ThreadPoolExecutor(max_workers=1)

    with open(
        "./server/databaseLoad/rawData/device_list.json", "r", encoding="utf-8"
    ) as x:
        data = json.load(x)

    keys = [
        info_text["key"]
        for show in data["data"]
        for info_text in show["device_list"]
    ]
    for result in executor.map(read_url, keys):
        try:
            results.append(json.loads(result.text))
        except:
            pass
    with open(
        "./server/databaseLoad/rawData/device_data.json", "w", encoding="utf-8"
    ) as x:
        json.dump(results, x)


get_devices()
get_data()
