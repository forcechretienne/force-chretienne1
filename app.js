"use strict";
const IMG = {"attieke": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTIyIiByeD0iODQiIHJ5PSI0NCIgZmlsbD0iI0U5RUNFRiIvPjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMTYiIHJ4PSI3MiIgcnk9IjM2IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQwIDExOCBRNjAgODQgMTAwIDkwIFExMjAgOTYgMTEyIDEyNCBROTAgMTQwIDU0IDEzMiBaIiBmaWxsPSIjRkZGM0JGIi8+PGcgZmlsbD0iI0Y1RDc2RSI+PGNpcmNsZSBjeD0iNjIiIGN5PSIxMTAiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjcyIiBjeT0iMTA0IiByPSIyLjUiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjExNCIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iOTAiIGN5PSIxMDQiIHI9IjIuNSIvPjxjaXJjbGUgY3g9Ijk2IiBjeT0iMTE4IiByPSIyLjUiLz48Y2lyY2xlIGN4PSI2OCIgY3k9IjEyMiIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iODQiIGN5PSIxMjYiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwOCIgcj0iMi41Ii8+PC9nPjxwYXRoIGQ9Ik0xMDggMTA4IFExMzIgODggMTYwIDEwNCBMMTcyIDk2IEwxNjggMTEyIEwxNzQgMTI2IEwxNjAgMTE4IFExMzQgMTMyIDEwOCAxMDggWiIgZmlsbD0iI0MyNDEwQyIvPjxjaXJjbGUgY3g9IjEyNCIgY3k9IjEwNiIgcj0iMyIgZmlsbD0iIzFCMUYyQSIvPjxwYXRoIGQ9Ik0xMzQgMTAwIFExNDAgMTEwIDEzNCAxMjAgTTE0NCAxMDAgUTE1MCAxMTAgMTQ0IDEyMCIgc3Ryb2tlPSIjN0MyRDEyIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48ZyBmaWxsPSIjRTAzMTMxIj48Y2lyY2xlIGN4PSI3MCIgY3k9IjE0MCIgcj0iNiIvPjxjaXJjbGUgY3g9Ijg0IiBjeT0iMTQ0IiByPSI1Ii8+PC9nPjxwYXRoIGQ9Ik0xMTggMTM2IEwxNDYgMTMyIiBzdHJva2U9IiMyRjlFNDQiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==", "basket": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNMzAgMTIwIFEzNCA5MiA2MiA4OCBMOTYgODAgUTExMiA2MCAxMzIgNzAgTDE2MCA5NiBRMTc2IDEwNCAxNzQgMTI0IEwxNzQgMTM2IEwzMCAxMzYgWiIgZmlsbD0iI0Y4RjlGQSIgc3Ryb2tlPSIjMUIxRjJBIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjYgMTM2IEwxNzggMTM2IEwxNzggMTQ4IFExNzggMTU0IDE3MiAxNTQgTDMyIDE1NCBRMjYgMTU0IDI2IDE0OCBaIiBmaWxsPSIjRTAzMTMxIi8+PHBhdGggZD0iTTYwIDEwNiBRMTAwIDEwMCAxNTAgMTEyIiBmaWxsPSJub25lIiBzdHJva2U9IiNFMDMxMzEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGcgc3Ryb2tlPSIjMUIxRjJBIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEwNiA4NCBMMTE0IDk2Ii8+PHBhdGggZD0iTTExNiA3OCBMMTI0IDkwIi8+PC9nPjwvc3ZnPgo=", "bissap": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSI4NiIgeT0iMTgiIHdpZHRoPSIyOCIgaGVpZ2h0PSIxNCIgcng9IjMiIGZpbGw9IiMyQjhBM0UiLz48cGF0aCBkPSJNODggMzIgTDExMiAzMiBMMTEyIDU2IFExMzYgNjYgMTM2IDkyIEwxMzYgMTY4IFExMzYgMTgwIDEyNCAxODAgTDc2IDE4MCBRNjQgMTgwIDY0IDE2OCBMNjQgOTIgUTY0IDY2IDg4IDU2IFoiIGZpbGw9IiM5QzFDM0IiLz48cmVjdCB4PSI2NCIgeT0iMTA0IiB3aWR0aD0iNzIiIGhlaWdodD0iNDQiIGZpbGw9IiNGRkY1RjUiLz48cGF0aCBkPSJNMTAwIDExMiBRMTEyIDEyMCAxMDAgMTMyIFE4OCAxMjAgMTAwIDExMiBaIiBmaWxsPSIjQzIyNTVDIi8+PHBhdGggZD0iTTg0IDEyNiBROTYgMTIyIDEwMCAxMzIgUTkwIDE0MCA4NCAxMjYgWiBNMTE2IDEyNiBRMTA0IDEyMiAxMDAgMTMyIFExMTAgMTQwIDExNiAxMjYgWiIgZmlsbD0iI0U2NDk4MCIvPjxwYXRoIGQ9Ik03NiA3MCBRNzIgOTAgNzQgMTYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgb3BhY2l0eT0iLjM1IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K", "blender": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNNjYgMzAgTDEzNCAzMCBMMTI2IDEyMCBMNzQgMTIwIFoiIGZpbGw9IiNEMEVCRkYiIHN0cm9rZT0iIzFCMUYyQSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTcyIDc2IEwxMjggNzYgTDEyNiAxMjAgTDc0IDEyMCBaIiBmaWxsPSIjRkY5MjJCIiBvcGFjaXR5PSIuODUiLz48cmVjdCB4PSI2MCIgeT0iMjIiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMiIgcng9IjQiIGZpbGw9IiMxQjFGMkEiLz48cGF0aCBkPSJNMTM0IDQ2IFExNTQgNTAgMTUwIDcyIFExNDYgOTIgMTMwIDk0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxQjFGMkEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTY4IDEyMCBMMTMyIDEyMCBMMTQwIDE3MiBRMTQwIDE3OCAxMzQgMTc4IEw2NiAxNzggUTYwIDE3OCA2MCAxNzIgWiIgZmlsbD0iIzM0M0E0MCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE1MCIgcj0iMTAiIGZpbGw9IiNBREI1QkQiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNTAiIHI9IjQiIGZpbGw9IiMzNDNBNDAiLz48L3N2Zz4K", "collier": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNNDAgNDAgUTEwMCAxNTAgMTYwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNCODg5MkIiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTUyIDQyIFExMDAgMTM1IDE0OCA0MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDlCNDVBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjIgNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTEyIiByPSI1IiBmaWxsPSIjQjg4OTJCIi8+PHBhdGggZD0iTTEwMCAxMTggTDExOCAxMzggTDEwMCAxNzAgTDgyIDEzOCBaIiBmaWxsPSIjMTI3QTVDIi8+PHBhdGggZD0iTTEwMCAxMTggTDExOCAxMzggTDEwMCAxNDUgTDgyIDEzOCBaIiBmaWxsPSIjMUZBMzdDIi8+PHBhdGggZD0iTTEwMCAxNDUgTDEwMCAxNzAiIHN0cm9rZT0iIzBCNUE0MyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNOTIgMTI4IEw5NiAxMjQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIG9wYWNpdHk9Ii43Ii8+PC9zdmc+Cg==", "faniko": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNMjQgMTA0IEgxNzYgTDE2MCAxNjggUTE1OCAxNzYgMTUwIDE3NiBINTAgUTQyIDE3NiA0MCAxNjggWiIgZmlsbD0iIzFGM0ZDNCIvPjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxMDQiIHJ4PSI3NiIgcnk9IjE0IiBmaWxsPSIjMzhCREY4Ii8+PHBhdGggZD0iTTYwIDEwMCBRNzAgNzAgOTYgNzggUTEwOCA2MCAxMzAgNzQgUTE1MCA3MiAxNDYgOTgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0FEQjVCRCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTcwIDk4IFE4MCA4NiA5NiA5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRDYyODM5IiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMTAgOTYgUTEyMiA4NCAxMzggOTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGQzkzQyIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48ZyBmaWxsPSIjRTBGNEZFIiBzdHJva2U9IiM3REQzRkMiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iNTQiIGN5PSI2NiIgcj0iOSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjUyIiByPSIxMiIvPjxjaXJjbGUgY3g9IjEyMiIgY3k9IjQwIiByPSI3Ii8+PGNpcmNsZSBjeD0iNzIiIGN5PSI0MCIgcj0iNiIvPjwvZz48L3N2Zz4K", "ferronnerie": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSIyMCIgeT0iNDAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzNDNBNDAiLz48cmVjdCB4PSIxNjYiIHk9IjQwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQwIiBmaWxsPSIjMzQzQTQwIi8+PHJlY3QgeD0iMzQiIHk9IjYwIiB3aWR0aD0iMTMyIiBoZWlnaHQ9IjgiIGZpbGw9IiMzNDNBNDAiLz48cmVjdCB4PSIzNCIgeT0iMTYwIiB3aWR0aD0iMTMyIiBoZWlnaHQ9IjgiIGZpbGw9IiMzNDNBNDAiLz48ZyBmaWxsPSIjMzQzQTQwIj48cmVjdCB4PSI1MiIgeT0iNjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjkyIi8+PHJlY3QgeD0iNzQiIHk9IjY4IiB3aWR0aD0iNiIgaGVpZ2h0PSI5MiIvPjxyZWN0IHg9Ijk2IiB5PSI2OCIgd2lkdGg9IjYiIGhlaWdodD0iOTIiLz48cmVjdCB4PSIxMTgiIHk9IjY4IiB3aWR0aD0iNiIgaGVpZ2h0PSI5MiIvPjxyZWN0IHg9IjE0MCIgeT0iNjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjkyIi8+PC9nPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGQzkzQyIgc3Ryb2tlLXdpZHRoPSI1Ij48cGF0aCBkPSJNNTUgNjAgcTAgLTE4IDIyIC0xOCBxMjIgMCAyMiAxOCIvPjxwYXRoIGQ9Ik05OSA2MCBxMCAtMTggMjIgLTE4IHEyMiAwIDIyIDE4Ii8+PGNpcmNsZSBjeD0iNzciIGN5PSIxMTQiIHI9IjEwIi8+PGNpcmNsZSBjeD0iMTIxIiBjeT0iMTE0IiByPSIxMCIvPjwvZz48Y2lyY2xlIGN4PSIyNyIgY3k9IjM2IiByPSI4IiBmaWxsPSIjRDYyODM5Ii8+PGNpcmNsZSBjeD0iMTczIiBjeT0iMzYiIHI9IjgiIGZpbGw9IiNENjI4MzkiLz48L3N2Zz4K", "gateau": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTY2IiByeD0iNzgiIHJ5PSIxMiIgZmlsbD0iI0RFRTJFNiIvPjxyZWN0IHg9IjQwIiB5PSI5NiIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2NiIgcng9IjgiIGZpbGw9IiM4QjQ1MTMiLz48cmVjdCB4PSI0MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkZFOENDIi8+PHBhdGggZD0iTTQwIDEwNCBRNDAgOTAgNTQgOTAgTDE0NiA5MCBRMTYwIDkwIDE2MCAxMDQgTDE2MCAxMDggUTE1MCAxMTggMTQwIDEwOCBRMTMwIDExOCAxMjAgMTA4IFExMTAgMTE4IDEwMCAxMDggUTkwIDExOCA4MCAxMDggUTcwIDExOCA2MCAxMDggUTUwIDExOCA0MCAxMDggWiIgZmlsbD0iI0ZGRjBGNiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9Ijc2IiByPSIxMCIgZmlsbD0iI0UwMzEzMSIvPjxwYXRoIGQ9Ik0xMDAgNjYgUTEwNCA1NiAxMTIgNTYiIHN0cm9rZT0iIzJGOUU0NCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PGcgZmlsbD0iI0ZGRDQzQiI+PGNpcmNsZSBjeD0iNjAiIGN5PSIxNDYiIHI9IjMiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjE0OCIgcj0iMyIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjE0NiIgcj0iMyIvPjxjaXJjbGUgY3g9IjE0NiIgY3k9IjE0OCIgcj0iMyIvPjwvZz48L3N2Zz4K", "hotel": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTQwIiByeD0iNiIgZmlsbD0iIzBFQTVFOSIvPjxyZWN0IHg9IjM0IiB5PSIzMCIgd2lkdGg9IjEzMiIgaGVpZ2h0PSIxOCIgcng9IjQiIGZpbGw9IiNENjI4MzkiLz48dGV4dCB4PSIxMDAiIHk9IjQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNGRkZGRkYiPkjDlFRFTDwvdGV4dD48ZyBmaWxsPSIjRTBGNEZFIj48cmVjdCB4PSI1NiIgeT0iNjIiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxOCIgcng9IjIiLz48cmVjdCB4PSI5MCIgeT0iNjIiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxOCIgcng9IjIiLz48cmVjdCB4PSIxMjQiIHk9IjYyIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHJlY3QgeD0iNTYiIHk9Ijk0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHJlY3QgeD0iOTAiIHk9Ijk0IiB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHJlY3QgeD0iMTI0IiB5PSI5NCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiByeD0iMiIvPjxyZWN0IHg9IjU2IiB5PSIxMjYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxOCIgcng9IjIiLz48cmVjdCB4PSIxMjQiIHk9IjEyNiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiByeD0iMiIvPjwvZz48cmVjdCB4PSI4OCIgeT0iMTMyIiB3aWR0aD0iMjQiIGhlaWdodD0iNDgiIHJ4PSIzIiBmaWxsPSIjRkZDOTNDIi8+PHBhdGggZD0iTTc4IDEzMiBoNDQgbC02IC04IGgtMzIgeiIgZmlsbD0iI0Q2MjgzOSIvPjxjaXJjbGUgY3g9IjEwNiIgY3k9IjE1NyIgcj0iMiIgZmlsbD0iIzBCMUIzRiIvPjxyZWN0IHg9IjIwIiB5PSIxNzYiIHdpZHRoPSIxNjAiIGhlaWdodD0iNiIgcng9IjMiIGZpbGw9IiM3REQzRkMiLz48L3N2Zz4K", "immo": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSIxNiIgeT0iMTY4IiB3aWR0aD0iMTY4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSIjN0REM0ZDIi8+PHBhdGggZD0iTTI0IDk2IEw3MiA1OCBMMTIwIDk2IFoiIGZpbGw9IiNENjI4MzkiLz48cmVjdCB4PSIzNCIgeT0iOTYiIHdpZHRoPSI3NiIgaGVpZ2h0PSI3MiIgZmlsbD0iI0ZGRjdFMCIvPjxyZWN0IHg9IjYwIiB5PSIxMjYiIHdpZHRoPSIyNCIgaGVpZ2h0PSI0MiIgcng9IjIiIGZpbGw9IiMwRUE1RTkiLz48cmVjdCB4PSI0MiIgeT0iMTA2IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIyIiBmaWxsPSIjN0REM0ZDIi8+PHJlY3QgeD0iOTAiIHk9IjEwNiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iIzdERDNGQyIvPjxyZWN0IHg9IjExOCIgeT0iMTA0IiB3aWR0aD0iNjIiIGhlaWdodD0iNjQiIHJ4PSI0IiBmaWxsPSIjMEVBNUU5Ii8+PHBhdGggZD0iTTExNCAxMDQgaDcwIGwtNiAtMTYgaC01OCB6IiBmaWxsPSIjRkZDOTNDIi8+PGcgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMiPjxwYXRoIGQ9Ik0xMjYgMTA0IHYtMTQgTTE0MCAxMDQgdi0xNCBNMTU0IDEwNCB2LTE0IE0xNjggMTA0IHYtMTQiIHN0cm9rZT0iI0UwQTgwMCIvPjwvZz48cmVjdCB4PSIxMjgiIHk9IjEyMCIgd2lkdGg9IjQyIiBoZWlnaHQ9IjQ4IiByeD0iMiIgZmlsbD0iI0UwRjRGRSIvPjxwYXRoIGQ9Ik0xMjggMTMyIGg0MiBNMTI4IDE0NCBoNDIgTTEyOCAxNTYgaDQyIiBzdHJva2U9IiM3REQzRkMiIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjEzNCIgeT0iMjgiIHdpZHRoPSI0NCIgaGVpZ2h0PSIzMCIgcng9IjQiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q2MjgzOSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iMTU2IiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjExIiBmaWxsPSIjRDYyODM5Ij7DgCBMT1VFUjwvdGV4dD48cGF0aCBkPSJNMTU2IDU4IHYzMCIgc3Ryb2tlPSIjMEIxQjNGIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4K", "lampe": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNNjQgMzQgTDEzNiAzNCBMMTU2IDk2IEw0NCA5NiBaIiBmaWxsPSIjRjA4QzAwIi8+PHBhdGggZD0iTTY0IDM0IEwxMzYgMzQgTDE0MCA0NiBMNjAgNDYgWiIgZmlsbD0iI0U2NzcwMCIvPjxnIHN0cm9rZT0iI0ZGRjNCRiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIuNyI+PHBhdGggZD0iTTcwIDYwIEwxMzAgNjAiLz48cGF0aCBkPSJNNjIgNzYgTDEzOCA3NiIvPjwvZz48cmVjdCB4PSI5NiIgeT0iOTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjY2IiBmaWxsPSIjNUMzQjFFIi8+PGVsbGlwc2UgY3g9IjEwMCIgY3k9IjE3MCIgcng9IjQwIiByeT0iMTAiIGZpbGw9IiM1QzNCMUUiLz48cGF0aCBkPSJNODAgOTYgUTEwMCAxMTYgMTIwIDk2IiBmaWxsPSIjRkZGM0JGIiBvcGFjaXR5PSIuOCIvPjwvc3ZnPgo=", "menuiserie": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSIzMCIgeT0iMTE4IiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjI2IiByeD0iNCIgZmlsbD0iI0M2ODY0MiIvPjxwYXRoIGQ9Ik00MCAxMjQgSDE3MCBNNDAgMTM2IEgxNzAiIHN0cm9rZT0iI0EwNTIyRCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iNDAiIHk9IjE0NCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjM2IiBmaWxsPSIjOEI1QTJCIi8+PHJlY3QgeD0iMTU4IiB5PSIxNDQiIHdpZHRoPSIxMiIgaGVpZ2h0PSIzNiIgZmlsbD0iIzhCNUEyQiIvPjxwYXRoIGQ9Ik03MCA0MCBMMTUwIDEwNCBMMTM2IDExNiBMNTYgNTIgWiIgZmlsbD0iI0FEQjVCRCIvPjxwYXRoIGQ9Ik03MCA0MCBMMTUwIDEwNCIgc3Ryb2tlPSIjNUI2MDZCIiBzdHJva2Utd2lkdGg9IjIiLz48ZyBmaWxsPSIjNUI2MDZCIj48cGF0aCBkPSJNNjAgNTYgbDQgNiIvPjxwYXRoIGQ9Ik04MCA3MiBMODQgNzYiLz48L2c+PHBhdGggZD0iTTQ0IDMwIFE0MCA1MiA1OCA1OCBMNzQgNDAgUTY2IDI2IDQ0IDMwIFoiIGZpbGw9IiNENjI4MzkiLz48L3N2Zz4K", "montre": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSI3OCIgeT0iMTQiIHdpZHRoPSI0NCIgaGVpZ2h0PSI1MiIgcng9IjgiIGZpbGw9IiMzNDNBNDAiLz48cmVjdCB4PSI3OCIgeT0iMTM0IiB3aWR0aD0iNDQiIGhlaWdodD0iNTIiIHJ4PSI4IiBmaWxsPSIjMzQzQTQwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0NiIgZmlsbD0iI0Q5QjQ1QSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMzgiIGZpbGw9IiNGRkZERjUiLz48cGF0aCBkPSJNMTAwIDEwMCBMMTAwIDc0IE0xMDAgMTAwIEwxMTggMTA4IiBzdHJva2U9IiMxQjFGMkEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0IiBmaWxsPSIjQjg4OTJCIi8+PGcgZmlsbD0iIzFCMUYyQSI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjgiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjEzMiIgY3k9IjEwMCIgcj0iMi41Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTMyIiByPSIyLjUiLz48Y2lyY2xlIGN4PSI2OCIgY3k9IjEwMCIgcj0iMi41Ii8+PC9nPjxyZWN0IHg9IjE0NiIgeT0iOTQiIHdpZHRoPSI4IiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0I4ODkyQiIvPjwvc3ZnPgo=", "ordinateur": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTY2IiByeD0iNzAiIHJ5PSI3IiBmaWxsPSIjRTNFOEYyIi8+PHJlY3QgeD0iMzQiIHk9IjQwIiB3aWR0aD0iMTMyIiBoZWlnaHQ9IjkyIiByeD0iMTAiIGZpbGw9IiMwQjFCM0YiLz48cmVjdCB4PSI0MiIgeT0iNDgiIHdpZHRoPSIxMTYiIGhlaWdodD0iNzQiIHJ4PSI1IiBmaWxsPSIjMUQ0RUQ4Ii8+PHJlY3QgeD0iNTIiIHk9IjYwIiB3aWR0aD0iNTAiIGhlaWdodD0iOCIgcng9IjQiIGZpbGw9IiNGRkM5M0MiLz48cmVjdCB4PSI1MiIgeT0iNzYiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2IiByeD0iMyIgZmlsbD0iIzkzQzVGRCIvPjxyZWN0IHg9IjUyIiB5PSI4OCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjYiIHJ4PSIzIiBmaWxsPSIjOTNDNUZEIi8+PHJlY3QgeD0iMTE4IiB5PSI5OCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0Q2MjgzOSIvPjxwYXRoIGQ9Ik04OCAxMzIgSDExMiBMMTE2IDE1NiBIODQgWiIgZmlsbD0iI0FEQjVCRCIvPjxyZWN0IHg9IjcwIiB5PSIxNTQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzBCMUIzRiIvPjwvc3ZnPgo=", "outils": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNNzQgNzAgVjU2IFE3NCA0OCA4MiA0OCBIMTE4IFExMjYgNDggMTI2IDU2IFY3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMEIxQjNGIiBzdHJva2Utd2lkdGg9IjgiLz48cmVjdCB4PSIyNCIgeT0iNzAiIHdpZHRoPSIxNTIiIGhlaWdodD0iOTQiIHJ4PSIxMiIgZmlsbD0iI0Q2MjgzOSIvPjxyZWN0IHg9IjI0IiB5PSI3MCIgd2lkdGg9IjE1MiIgaGVpZ2h0PSIyNiIgcng9IjEyIiBmaWxsPSIjQjUxRjJFIi8+PHJlY3QgeD0iODgiIHk9Ijg4IiB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHJ4PSI0IiBmaWxsPSIjRkZDOTNDIi8+PGcgdHJhbnNmb3JtPSJyb3RhdGUoLTM1IDcwIDQwKSI+PHJlY3QgeD0iNjIiIHk9IjEwIiB3aWR0aD0iMTQiIGhlaWdodD0iNjAiIHJ4PSI0IiBmaWxsPSIjOEI1QTJCIi8+PHJlY3QgeD0iNDgiIHk9IjIiIHdpZHRoPSI0MiIgaGVpZ2h0PSIxOCIgcng9IjQiIGZpbGw9IiM1QjYwNkIiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAgMTQwIDQwKSI+PHJlY3QgeD0iMTM0IiB5PSI4IiB3aWR0aD0iMTIiIGhlaWdodD0iNjIiIHJ4PSI1IiBmaWxsPSIjMUYzRkM0Ii8+PGNpcmNsZSBjeD0iMTQwIiBjeT0iOCIgcj0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFGM0ZDNCIgc3Ryb2tlLXdpZHRoPSI4Ii8+PC9nPjwvc3ZnPgo=", "parfum": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSI4NCIgeT0iMjgiIHdpZHRoPSIzMiIgaGVpZ2h0PSIyNiIgcng9IjQiIGZpbGw9IiNCODg5MkIiLz48cmVjdCB4PSI5MiIgeT0iNTQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiIgZmlsbD0iI0Q5QjQ1QSIvPjxyZWN0IHg9IjUwIiB5PSI2NiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMTIiIHJ4PSIyMiIgZmlsbD0iI0YzRDlGQSIgc3Ryb2tlPSIjODYyRTlDIiBzdHJva2Utd2lkdGg9IjQiLz48cmVjdCB4PSI3MCIgeT0iMTA0IiB3aWR0aD0iNjAiIGhlaWdodD0iMzgiIHJ4PSI2IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg0IDEyNCBMMTE2IDEyNCIgc3Ryb2tlPSIjODYyRTlDIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik05MCAxMTQgTDExMCAxMTQiIHN0cm9rZT0iI0I4ODkyQiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjIgODQgUTYwIDEyMCA2NCAxNjAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1IiBvcGFjaXR5PSIuNyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==", "plomberie": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNMzAgNzAgSDExMCBRMTMwIDcwIDEzMCA5MCBWMTcwIiBmaWxsPSJub25lIiBzdHJva2U9IiM1QjYwNkIiIHN0cm9rZS13aWR0aD0iMjIiLz48cmVjdCB4PSI4OCIgeT0iNTYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyOCIgcng9IjMiIGZpbGw9IiMzNDNBNDAiLz48cmVjdCB4PSIxMTYiIHk9IjExMCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iIzM0M0E0MCIvPjxwYXRoIGQ9Ik0xMzAgMTc1IHEtNiAxMCAwIDE0IHE2IC00IDAgLTE0eiIgZmlsbD0iIzM4QkRGOCIvPjxnIHRyYW5zZm9ybT0icm90YXRlKC00MCAxMjAgNjApIj48cmVjdCB4PSIxMTIiIHk9IjQwIiB3aWR0aD0iMTYiIGhlaWdodD0iOTYiIHJ4PSI2IiBmaWxsPSIjMUYzRkM0Ii8+PHBhdGggZD0iTTEwNCA0MCBhMTYgMTYgMCAxIDEgMzIgMCBsLTggMCBsMCAtMTAgbC0xNiAwIGwwIDEwIHoiIGZpbGw9IiMxRjNGQzQiLz48L2c+PC9zdmc+Cg==", "robe": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNODIgMjQgTDExOCAyNCBMMTE0IDU4IFExMjggNjYgMTI2IDgyIEwxNTAgMTc2IEw1MCAxNzYgTDc0IDgyIFE3MiA2NiA4NiA1OCBaIiBmaWxsPSIjRTg1OTBDIi8+PHBhdGggZD0iTTc4IDEwMCBMMTIyIDEwMCIgc3Ryb2tlPSIjN0EyRTA1IiBzdHJva2Utd2lkdGg9IjUiLz48ZyBmaWxsPSIjRkZENDNCIj48Y2lyY2xlIGN4PSI5MCIgY3k9IjEyNSIgcj0iNiIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjE0MCIgcj0iNiIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iMTU1IiByPSI2Ii8+PGNpcmNsZSBjeD0iMTI1IiBjeT0iMTY1IiByPSI2Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjUiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMkI4QTNFIiBzdHJva2Utd2lkdGg9IjMiPjxjaXJjbGUgY3g9IjkwIiBjeT0iMTI1IiByPSIxMCIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjE0MCIgcj0iMTAiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjE1NSIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMjUiIGN5PSIxNjUiIHI9IjEwIi8+PC9nPjxwYXRoIGQ9Ik04NiAyNCBRMTAwIDQwIDExNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0EyRTA1IiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4K", "sac": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNNzIgNzYgUTcyIDM0IDEwMCAzNCBRMTI4IDM0IDEyOCA3NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNUMzQjFFIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik00NCA3NiBMMTU2IDc2IEwxNzAgMTcwIFExNzAgMTgwIDE2MCAxODAgTDQwIDE4MCBRMzAgMTgwIDMwIDE3MCBaIiBmaWxsPSIjQTA1MjJEIi8+PHBhdGggZD0iTTQ0IDc2IEwxNTYgNzYgTDE2MCAxMDQgUTEwMCAxMjQgNDAgMTA0IFoiIGZpbGw9IiM4QjQ1MTMiLz48cmVjdCB4PSI5MCIgeT0iMTAwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHJ4PSIzIiBmaWxsPSIjRDlCNDVBIi8+PHBhdGggZD0iTTUwIDE0MCBMMTUwIDE0MCIgc3Ryb2tlPSIjNUMzQjFFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNSIvPjwvc3ZnPgo=", "telephone": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB4PSI2MiIgeT0iMjIiIHdpZHRoPSI3NiIgaGVpZ2h0PSIxNTYiIHJ4PSIxNCIgZmlsbD0iIzFCMUYyQSIvPjxyZWN0IHg9IjY4IiB5PSIzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjEzNiIgcng9IjkiIGZpbGw9IiMzQjVCREIiLz48cGF0aCBkPSJNNjggMTIwIFExMDAgOTAgMTMyIDExMCBMMTMyIDE1OSBRMTMyIDE2OCAxMjMgMTY4IEw3NyAxNjggUTY4IDE2OCA2OCAxNTkgWiIgZmlsbD0iIzdDOUJGRiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjcyIiByPSIxNiIgZmlsbD0iI0ZGRDE2NiIvPjxyZWN0IHg9Ijg4IiB5PSIyNiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjM0E0MTUyIi8+PHJlY3QgeD0iMTM4IiB5PSI1OCIgd2lkdGg9IjMiIGhlaWdodD0iMjIiIHJ4PSIxLjUiIGZpbGw9IiMzQTQxNTIiLz48L3N2Zz4K", "voiture": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTUwIiByeD0iODAiIHJ5PSI4IiBmaWxsPSIjRTNFOEYyIi8+PHBhdGggZD0iTTI4IDEyNiBMMzQgMTA0IFEzOCA5NCA1MCA5MiBMNzAgOTAgTDg2IDY4IFE5MCA2MiA5OCA2MiBIMTM0IFExNDIgNjIgMTQ3IDY4IEwxNjIgOTAgUTE3NiA5MiAxNzggMTA0IEwxNzggMTI2IFExNzggMTM0IDE3MCAxMzQgSDM2IFEyOCAxMzQgMjggMTI2IFoiIGZpbGw9IiNENjI4MzkiLz48cGF0aCBkPSJNOTIgNzIgSDEzMCBRMTM2IDcyIDEzOSA3NyBMMTQ4IDkwIEg4MCBaIiBmaWxsPSIjQkZEQkZFIi8+PHBhdGggZD0iTTExMiA3MiBWOTAiIHN0cm9rZT0iI0Q2MjgzOSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMzAiIHk9IjEwNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjgiIHJ4PSIzIiBmaWxsPSIjRkZDOTNDIi8+PHJlY3QgeD0iMTY0IiB5PSIxMDYiIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiByeD0iMyIgZmlsbD0iI0ZGRThBMyIvPjxwYXRoIGQ9Ik02MCAxMTIgSDE1MCIgc3Ryb2tlPSIjQjUxRjJFIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iMTM0IiByPSIxNyIgZmlsbD0iIzBCMUIzRiIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iMTM0IiByPSI3IiBmaWxsPSIjQURCNUJEIi8+PGNpcmNsZSBjeD0iMTQ2IiBjeT0iMTM0IiByPSIxNyIgZmlsbD0iIzBCMUIzRiIvPjxjaXJjbGUgY3g9IjE0NiIgY3k9IjEzNCIgcj0iNyIgZmlsbD0iI0FEQjVCRCIvPjwvc3ZnPgo="};
/* ===== Socle : Preact, Supabase, cache de données, icônes, composants partagés ===== */
const { h, render } = preact;
const { useState, useEffect, useRef } = preactHooks;
const html = htm.bind(h);
const sb = supabase.createClient(window.FC_CONFIG.supabaseUrl, window.FC_CONFIG.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });

/* Photos libres de droits (Unsplash, licence gratuite) pour les bannières et univers de Joyau */
const UNSPLASH = { attieke: "photo-1665332195309-9d75071138f0", robe: "photo-1709809081557-78f803ce93a0", sac: "photo-1605733513597-a8f8341084e6", collier: "photo-1783541507490-edb026e2a961", telephone: "photo-1511707171634-5f897ff02aa9", blender: "photo-1622818426197-d54f85b88690", parfum: "photo-1587017539504-67cfbddac569", immo: "photo-1580587771525-78b9dba3b914", hotel: "photo-1611892440504-42a792e24d32", menuiserie: "photo-1561297331-a9c00b9c2c44", outils: "photo-1581783898377-1c85bf937427", voiture: "photo-1550355291-bbee04a92027", ordinateur: "photo-1541807084-5c52b6b3adef" };
for (const k in UNSPLASH) IMG[k] = "https://images.unsplash.com/" + UNSPLASH[k] + "?w=640&q=70&auto=format&fit=crop";
const CATS = ["Tout", "Immobilier", "Services", "Gastronomie", "Mode", "Téléphones", "Bijoux & Montres", "Beauté", "Électroménager", "Maison", "Informatique", "Auto & Moto", "Bébé"];
const PROFILE_COLS = "id,nom,prenoms,profession,entreprise,photo_url,eglise,assemblee,ville,status,role";

/* Mode « Joyau seul » : ouvert par le lien /joyau (application Joyau installée à part) */
const JOYAU_MODE = window.FC_MODE === "joyau";
function goFC(start) { location.href = "/" + (start ? "?start=" + start : ""); }
async function shareLink(title, text, url) {
  try { if (navigator.share) { await navigator.share({ title, text, url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast("Lien copié : collez-le dans WhatsApp ou vos réseaux."); }
  catch (e) { openSheet("copy", { url }); }
}

/* État global de l'interface */
const S = { session: null, me: null, booted: false, guest: false, recovery: false };
const UI = { tab: "home", stack: [], sheet: null, toast: "", toastT: 0, start: "" };
let REV = 0;
let rerender = () => {};
function refresh() { REV++; rerender(); }
function go(tab) { UI.tab = tab; UI.stack = []; UI.sheet = null; rerender(); try { window.scrollTo(0, 0); } catch (e) {} }
function push(type, data) { UI.stack.push(Object.assign({ type }, data || {})); UI.sheet = null; rerender(); }
function back() { UI.stack.pop(); rerender(); }
function openSheet(type, data) { UI.sheet = Object.assign({ type }, data || {}); rerender(); }
function closeSheet() { UI.sheet = null; rerender(); }
function toast(msg) { UI.toast = msg; clearTimeout(UI.toastT); UI.toastT = setTimeout(() => { UI.toast = ""; rerender(); }, 3000); rerender(); }
function isMember() { return !!(S.me && S.me.status === "active"); }
function isAdmin() { return !!(S.me && S.me.role === "admin"); }
function uid() { return S.session ? S.session.user.id : null; }

/* Messages d'erreur compréhensibles */
function errText(e) {
  const m = (e && (e.message || e.error_description || String(e))) || "";
  if (/Invalid login credentials/i.test(m)) return "E-mail ou mot de passe incorrect.";
  if (/Email not confirmed/i.test(m)) return "Confirmez d'abord votre adresse e-mail grâce au lien reçu, puis reconnectez-vous.";
  if (/User already registered|already been registered/i.test(m)) return "Un compte existe déjà avec cet e-mail. Connectez-vous.";
  if (/Password should be at least|weak/i.test(m)) return "Mot de passe trop faible : 8 caractères minimum, avec des lettres et des chiffres.";
  if (/rate limit|too many/i.test(m)) return "Trop de tentatives. Patientez quelques minutes puis réessayez.";
  if (/Failed to fetch|NetworkError|network/i.test(m)) return "Connexion internet indisponible. Vérifiez votre réseau et réessayez.";
  if (/row-level security|permission denied/i.test(m)) return "Action non autorisée pour votre compte.";
  if (/duplicate key/i.test(m)) return "C'est déjà fait.";
  if (/payload too large|exceeded the maximum/i.test(m)) return "Fichier trop lourd. Choisissez une image plus légère.";
  return "Une erreur est survenue. Réessayez dans un instant.";
}
function fail(e) { console.error(e); toast(errText(e)); }
async function q(promise) { const r = await promise; if (r.error) throw r.error; return r.data; }

/* Lecture de données avec cache : relue automatiquement après chaque modification (refresh) */
const CACHE = {};
function useData(key, fetcher, deps) {
  const [st, setSt] = useState(() => (key in CACHE ? { data: CACHE[key], loading: false } : { data: null, loading: true }));
  useEffect(() => {
    let on = true;
    if (!(key in CACHE)) setSt({ data: null, loading: true });
    fetcher().then(d => { CACHE[key] = d; if (on) setSt({ data: d, loading: false }); })
      .catch(e => { console.error(key, e); if (on) setSt(s => ({ data: s.data, loading: false, error: e })); });
    return () => { on = false; };
  }, [key, REV].concat(deps || []));
  return st;
}

/* Fichiers : compression puis envoi dans Supabase Storage */
function compress(file, max) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? resolve(b) : reject(new Error("Image illisible")), "image/jpeg", 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image illisible")); };
    img.src = url;
  });
}
async function uploadFile(bucket, blob, name) {
  const path = uid() + "/" + name + "-" + Date.now() + ".jpg";
  await q(sb.storage.from(bucket).upload(path, blob, { contentType: "image/jpeg", upsert: true }));
  return path;
}
async function uploadRaw(bucket, file, name, ext, type) {
  const path = uid() + "/" + name + "-" + Date.now() + "." + ext;
  await q(sb.storage.from(bucket).upload(path, file, { contentType: type, upsert: true }));
  return path;
}
function publicUrl(bucket, path) { return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl; }
async function signedUrl(bucket, path) { const d = await q(sb.storage.from(bucket).createSignedUrl(path, 600)); return d.signedUrl; }

/* Formats */
function fmt(n) { return String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA"; }
function ago(d) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return "à l'instant";
  if (s < 3600) return "il y a " + Math.floor(s / 60) + " min";
  if (s < 86400) return "il y a " + Math.floor(s / 3600) + " h";
  if (s < 172800) return "hier";
  if (s < 604800) return "il y a " + Math.floor(s / 86400) + " j";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
function hhmm(d) { const x = new Date(d); return String(x.getHours()).padStart(2, "0") + ":" + String(x.getMinutes()).padStart(2, "0"); }
function fullName(p) { return p ? (p.prenoms + " " + p.nom) : "Membre"; }
function jobLine(p) { return p ? (p.profession + (p.entreprise ? " · " + p.entreprise : "")) : ""; }
function initials(name) { return String(name || "?").replace(/[^A-Za-zÀ-ÿ' -]/g, "").split(/[\s-]+/).filter(w => w.length > 1).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "?"; }
const AV_COLORS = [["#F3E7C6", "#5B4612"], ["#23262D", "#F6DC8A"], ["#E9E9EE", "#23262D"], ["#DCD3BD", "#3A3220"], ["#3A3D45", "#FFFFFF"], ["#F7EED6", "#8E6A1C"]];
function avColor(id) { let n = 0; for (const c of String(id)) n += c.charCodeAt(0); return AV_COLORS[n % AV_COLORS.length]; }
function waNumber(p) { const d = String(p || "").replace(/\D/g, ""); if (!d) return ""; if (d.length === 10) return "225" + d; return d; }

/* ===== Notifications sur le téléphone (Web Push) ===== */
const PUSH_URL = window.FC_CONFIG.supabaseUrl + "/functions/v1/push";
function isIOS() { return /iPhone|iPad|iPod/.test(navigator.userAgent); }
function isStandalone() { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } }
function pushSupported() { return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window; }
function b64ToU8(s) { const p = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4); const b = atob(p); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
async function pushState() {
  if (!pushSupported()) return isIOS() && !isStandalone() ? "ios-install" : "unsupported";
  if (Notification.permission === "denied") return "denied";
  try { const reg = await navigator.serviceWorker.getRegistration(); const s = reg && await reg.pushManager.getSubscription(); return s && Notification.permission === "granted" ? "on" : "off"; } catch (e) { return "off"; }
}
async function enablePush() {
  const st = await pushState();
  if (st === "ios-install") throw new Error("IOS_INSTALL");
  if (st === "unsupported") throw new Error("UNSUPPORTED");
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("DENIED");
  if (!navigator.serviceWorker.controller) { try { await navigator.serviceWorker.register("/sw.js"); } catch (e) {} }
  const reg = await navigator.serviceWorker.ready;
  const r = await fetch(PUSH_URL, { method: "POST", headers: { "Content-Type": "application/json", apikey: window.FC_CONFIG.supabaseKey }, body: JSON.stringify({ action: "key" }) });
  const { publicKey } = await r.json();
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(publicKey) });
  const j = sub.toJSON();
  await q(sb.rpc("save_push_subscription", { p_endpoint: j.endpoint, p_p256dh: j.keys.p256dh, p_auth: j.keys.auth }));
}
async function disablePush() {
  const reg = await navigator.serviceWorker.getRegistration(); const s = reg && await reg.pushManager.getSubscription();
  if (s) { try { await sb.from("push_subscriptions").delete().eq("endpoint", s.endpoint); } catch (e) {} await s.unsubscribe(); }
}
function pushError(e) {
  const m = e && e.message;
  if (m === "IOS_INSTALL") return "Sur iPhone, ajoutez d'abord l'application à l'écran d'accueil (Partager → Sur l'écran d'accueil), puis activez les notifications depuis l'icône.";
  if (m === "DENIED") return "Les notifications sont bloquées. Autorisez-les dans les réglages du navigateur pour ce site, puis réessayez.";
  if (m === "UNSUPPORTED") return "Ce navigateur ne gère pas les notifications. Utilisez Chrome sur Android, ou l'application installée sur iPhone.";
  return errText(e);
}
/* Carte « Activer les notifications » (inscription, accueil, profil) */
function PushCard({ title, text, compact, onDone }) {
  const [st, setSt] = useState("…");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => { pushState().then(setSt); }, []);
  const on = async () => { setBusy(true); setMsg(""); try { await enablePush(); setSt("on"); toast("Notifications activées sur ce téléphone."); onDone && onDone(); } catch (e) { setMsg(pushError(e)); pushState().then(setSt); } setBusy(false); };
  if (st === "…" || (compact && st === "unsupported")) return null;
  if (st === "on") return compact ? null : html`<div class="feature" style="background:var(--ok-soft)"><span class="ic"><${Icon} n="bell" c="#15803D" /></span><span><b style="color:#15803D">Notifications activées</b><br /><span class="small muted">Vous serez prévenu sur ce téléphone, même application fermée.</span></span></div>`;
  return html`<div class="card col" style="gap:10px;border-color:var(--gold-line);background:#FFFCF4">
    <span class="row" style="align-items:flex-start"><span class="icon-btn" style="background:var(--gold-soft);flex:none"><${Icon} n="bell" s=${21} c="#8E6A1C" /></span><span class="grow"><b>${title || "Activez les notifications"}</b><br /><span class="small muted" style="line-height:1.45">${text || "Messages, invitations, candidatures, validation de votre adhésion : soyez prévenu sur ce téléphone, même application fermée."}</span></span></span>
    ${st === "ios-install" ? html`<span class="small" style="line-height:1.5;color:#5B4612">Sur iPhone : touchez <b>Partager</b> puis <b>Sur l'écran d'accueil</b>, ouvrez l'application depuis son icône, puis revenez ici.</span>`
      : st === "denied" ? html`<span class="small" style="line-height:1.5;color:var(--danger)">Les notifications sont bloquées pour ce site. Autorisez-les dans les réglages du navigateur (icône à gauche de l'adresse → Notifications → Autoriser).</span>`
      : st === "unsupported" ? html`<span class="small muted">Ce navigateur ne gère pas les notifications.</span>`
      : html`<${Busy} on=${busy} cls="btn btn-gold btn-block" onClick=${on}><${Icon} n="bell" s=${18} />Activer les notifications<//>`}
    ${msg && html`<span class="small" style="color:var(--danger);line-height:1.45">${msg}</span>`}
  </div>`;
}

/* Favoris Joyau : gardés sur l'appareil */
function getFavs() { try { return JSON.parse(localStorage.getItem("fc-favs") || "[]"); } catch (e) { return []; } }
function toggleFav(id) { const f = getFavs(); const i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else { f.push(id); toast("Ajouté à vos favoris."); } try { localStorage.setItem("fc-favs", JSON.stringify(f)); } catch (e) {} rerender(); }

/* ===== Icônes ===== */
const ICONS = {
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6 6 0 0 1 3.5 6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 13h18"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  back: '<path d="M15 5l-7 7 7 7"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  like: '<path d="M7 11v9H4v-9z"/><path d="M7 11l4-7a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.3l-1.2 5A2 2 0 0 1 17.8 20H7"/>',
  comment: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  share: '<path d="M4 12v7h16v-7"/><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/>',
  send: '<path d="M4 12l16-8-6 16-2-7z"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-8 7"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  church: '<path d="M12 2v6M9 5h6"/><path d="M5 22V12l7-4 7 4v10"/><path d="M10 22v-5h4v5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 13h3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  logout: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 19h16"/>',
  store: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 0 1-5 2 3 3 0 0 1-6 0 3 3 0 0 1-5-2z"/><path d="M5 13v7h14v-7"/>',
  wa: '<path d="M3 21l1.65-4.5A9 9 0 1 1 8 20.3L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/>',
  tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
  building: '<path d="M4 21V5l8-3v19"/><path d="M12 9h8v12"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.5 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};
function Icon({ n, s = 22, c = "currentColor", w = 2, fill = "none" }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill=${fill} stroke=${c} stroke-width=${w} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: ICONS[n] || "" }}></svg>`;
}

/* ===== Logos ===== */
function Shield({ s = 38 }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 100 100" aria-hidden="true" style="flex:none"><path d="M50 6 L86 18 V46 C86 70 70 86 50 94 C30 86 14 70 14 46 V18 Z" fill="url(#fcGold)"></path><path d="M50 13 L79 23 V46 C79 66 66 79 50 86 C34 79 21 66 21 46 V23 Z" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.85"></path><rect x="45" y="26" width="10" height="48" rx="2" fill="#23262D"></rect><rect x="32" y="39" width="36" height="10" rx="2" fill="#23262D"></rect></svg>`;
}
function Bag({ s = 30, handle = "#1F3FC4" }) {
  return html`<svg width=${s} height=${s} viewBox="0 0 100 100" aria-hidden="true" style="flex:none"><path d="M34 34 C34 13 46 13 46 34 M54 34 C54 13 66 13 66 34" fill="none" stroke=${handle} stroke-width="6" stroke-linecap="round"></path><path d="M22 33 H78 L83 82 Q83.6 88 77.5 88 H22.5 Q16.4 88 17 82 Z" fill="#D62839"></path><path d="M22 33 H78 L78.9 41 H21.1 Z" fill="#B51F2E"></path><polygon points="37,57 43.5,49 56.5,49 63,57 50,74" fill="#1F3FC4" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"></polygon><polygon points="43.5,49 50,57 56.5,49" fill="#5B7BFF"></polygon></svg>`;
}
function JoyauLogo({ slogan = true }) {
  return html`<span class="j-logo"><span class="sq"><${Bag} s=${28} /></span><span><b>joyau</b>${slogan && html`<small>ICI, ON VEND TOUT</small>`}</span></span>`;
}
function Wordmark() {
  const ch = "CHRÉTIENNE".split(""), sl = "RAYONNER ENSEMBLE".split("");
  return html`<span class="wordmark"><span class="force">FORCE</span><span class="bar"></span>
    <span class="just ch">${ch.map((c, i) => html`<span key=${i}>${c}</span>`)}</span>
    <span class="just sl">${sl.map((c, i) => html`<span key=${i}>${c === " " ? " " : c}</span>`)}</span></span>`;
}

/* ===== Composants partagés ===== */
function Avatar({ p, size = 44 }) {
  const id = p ? p.id : "x";
  const [bg, fg] = avColor(id);
  return html`<span class="av" style=${`width:${size}px;height:${size}px;background:${bg};color:${fg};font-size:${Math.round(size / 2.7)}px`}>${p && p.photo_url ? html`<img src=${p.photo_url} alt="" loading="lazy" />` : initials(fullName(p))}</span>`;
}
function Verified({ s = 15 }) {
  return html`<span class="verified" title="Membre vérifié"><svg width=${s} height=${s} viewBox="0 0 24 24" aria-label="Membre vérifié" role="img"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.2 15.8l1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z" fill="url(#fcGold)"></path><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#23262D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>`;
}
function OvHead({ title, right, onBack }) {
  return html`<div class="ov-head"><button class="icon-btn" onClick=${onBack || back} aria-label="Retour"><${Icon} n="back" /></button><h1>${title}</h1>${right || ""}</div>`;
}
function Field({ label, req, hint, err, children }) {
  return html`<div class="field"><label>${label}${req && html` <span class="req">*</span>`}</label>${children}${hint && html`<span class="hint">${hint}</span>`}${err && html`<span class="err-msg">${err}</span>`}</div>`;
}
/* Sélection d'image : garde le fichier compressé (Blob) et un aperçu local */
function Upload({ id, label, sub, preview, onFile, max = 1200, icon = "camera", done }) {
  const [busy, setBusy] = useState(false);
  return html`<label class="upload" for=${id}>
    <span class="thumb">${preview ? html`<img src=${preview} alt="" />` : html`<${Icon} n=${icon} s=${26} c="#8E6A1C" />`}</span>
    <span class="grow col" style="gap:3px"><b style="font-size:14.5px">${busy ? "Préparation…" : preview ? (done || "Image ajoutée · changer") : label}</b><span class="small muted">${sub}</span></span>
    <input id=${id} type="file" accept="image/*" onChange=${async e => { const f = e.target.files[0]; if (!f) return; setBusy(true); try { const b = await compress(f, max); onFile(b, URL.createObjectURL(b)); } catch (x) { toast("Impossible de lire cette image. Essayez une photo JPG ou PNG."); } setBusy(false); }} />
  </label>`;
}
/* Sélection d'un fichier PDF (6 Mo maximum) */
function PdfUpload({ id, label, sub, file, onFile }) {
  return html`<label class="upload" for=${id}>
    <span class="thumb">${file ? html`<span style="font:800 13px var(--f-head);color:#B91C1C">PDF</span>` : html`<${Icon} n="file" s=${26} c="#8E6A1C" />`}</span>
    <span class="grow col" style="gap:3px;min-width:0"><b style="font-size:14.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${file ? file.name : label}</b><span class="small muted">${file ? "Fichier ajouté · changer" : sub}</span></span>
    <input id=${id} type="file" accept="application/pdf,.pdf" onChange=${e => { const f = e.target.files[0]; if (!f) return; if (!/pdf$/i.test(f.type) && !/\.pdf$/i.test(f.name)) { toast("Choisissez un fichier PDF."); return; } if (f.size > 6 * 1024 * 1024) { toast("Fichier trop lourd : 6 Mo maximum."); return; } onFile(f); }} />
  </label>`;
}
function Empty({ icon = "info", title, text, children }) {
  return html`<div class="empty"><span class="icon-btn" style="width:56px;height:56px;border-radius:18px"><${Icon} n=${icon} s=${26} /></span><b style="color:var(--ink);font-size:16px">${title}</b>${text && html`<span class="small" style="max-width:320px;line-height:1.5">${text}</span>`}${children}</div>`;
}
function Loading({ label }) { return html`<div class="empty"><span class="spin"></span><span class="small">${label || "Chargement…"}</span></div>`; }
function Sheet({ children, onClose }) {
  return html`<div class="sheet-bg" onClick=${e => { if (e.target === e.currentTarget) (onClose || closeSheet)(); }}><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${children}</div></div>`;
}
function Busy({ on, children, cls = "btn btn-gold btn-block", onClick, type, style, disabled }) {
  return html`<button class=${cls} type=${type || "button"} style=${style || ""} disabled=${on || disabled} onClick=${onClick}>${on ? html`<span class="spin sm"></span>Patientez…` : children}</button>`;
}
function JoinPrompt({ what }) {
  return html`<${Sheet}>
    <div class="col center" style="align-items:center;gap:12px;padding:6px 4px 4px">
      <${Shield} s=${58} />
      <h2 style="font-size:21px">Réservé aux membres</h2>
      <p class="muted" style="line-height:1.55"><b style="color:var(--ink)">${what || "Cette fonctionnalité"}</b> : accès réservé aux membres validés de Force Chrétienne. Vous pouvez continuer à acheter sur Joyau sans compte.</p>
      <button class="btn btn-gold btn-block" onClick=${() => { if (JOYAU_MODE) { goFC(S.session ? "" : "signup"); return; } S.guest = false; UI.sheet = null; UI.stack = []; UI.start = S.session ? "" : "signup"; rerender(); }}>${S.session ? "Voir mon adhésion" : "Rejoindre Force Chrétienne"}</button>
      ${!S.session && html`<button class="btn btn-line btn-block" onClick=${() => { if (JOYAU_MODE) { goFC("login"); return; } S.guest = false; UI.sheet = null; UI.stack = []; UI.start = "login"; rerender(); }}>J'ai déjà un compte</button>`}
      <button class="btn btn-ghost btn-block" onClick=${closeSheet}>Continuer sur Joyau</button>
    </div>
  <//>`;
}

/* ===== Comptes : connexion, création, profil, adhésion ===== */
async function loadMe() {
  if (!S.session) { S.me = null; return; }
  try { S.me = await q(sb.from("profiles").select("*").eq("id", uid()).maybeSingle()); }
  catch (e) { console.error(e); S.me = S.me || null; }
}
async function boot() {
  try { const { data } = await sb.auth.getSession(); S.session = data.session; } catch (e) { console.error(e); }
  await loadMe();
  S.booted = true; rerender();
  openFromUrl(location.search);
  try { navigator.serviceWorker && navigator.serviceWorker.addEventListener("message", e => { if (e.data && e.data.type === "open") openFromUrl(new URL(e.data.url, location.origin).search); }); } catch (e) {}
  sb.auth.onAuthStateChange(async (ev, session) => {
    if (ev === "PASSWORD_RECOVERY") S.recovery = true;
    const changed = (session && session.user.id) !== (S.session && S.session.user.id);
    S.session = session;
    if (changed || ev === "SIGNED_IN" || ev === "USER_UPDATED") { await loadMe(); for (const k in CACHE) delete CACHE[k]; startRealtime(); }
    if (!session) { S.me = null; stopRealtime(); }
    refresh();
  });
  startRealtime();
}
/* Ouvre le bon écran quand on touche une notification (?open=…) */
function openFromUrl(search) {
  const qs = new URLSearchParams(search || "");
  const pId = qs.get("p"), sId = qs.get("s"), start = qs.get("start");
  if (pId || sId || start) {
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
    if (start === "signup" || start === "login") { if (!S.session) UI.start = start; }
    else if (pId) { if (!JOYAU_MODE) { S.guest = S.guest || !isMember(); UI.tab = "joyau"; } UI.stack = []; push("product", { id: pId }); }
    else if (sId) { if (!JOYAU_MODE) { S.guest = S.guest || !isMember(); UI.tab = "joyau"; } UI.stack = []; push("seller", { id: sId }); }
    refresh(); return;
  }
  const v = qs.get("open");
  if (!v) return;
  try { history.replaceState(null, "", location.pathname); } catch (e) {}
  for (const k in CACHE) delete CACHE[k];
  if (!isMember()) { refresh(); return; }
  if (v === "notifs") { UI.stack = []; push("notifs"); }
  else if (v === "admin") { UI.stack = []; if (isAdmin()) push("admin"); }
  else if (v === "network" || v === "home" || v === "opps" || v === "messages") go(v);
  else if (v.startsWith("chat:")) { UI.tab = "messages"; UI.stack = []; push("chat", { id: v.slice(5) }); }
  else if (v.startsWith("profile:")) { UI.stack = []; push("profile", { id: v.slice(8) }); }
  refresh();
}
let RT = null;
function startRealtime() {
  stopRealtime();
  if (!uid()) return;
  RT = sb.channel("fc-" + uid())
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "recipient=eq." + uid() }, () => refresh())
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: "user_id=eq." + uid() }, async p => { if (p.new && /adhésion/.test(p.new.text)) await loadMe(); refresh(); })
    .subscribe();
}
function stopRealtime() { if (RT) { try { sb.removeChannel(RT); } catch (e) {} RT = null; } }
async function signOut() { stopRealtime(); await sb.auth.signOut(); S.session = null; S.me = null; S.guest = false; UI.stack = []; UI.tab = "home"; UI.start = ""; for (const k in CACHE) delete CACHE[k]; refresh(); }

function Welcome() {
  return html`<div class="welcome">
    <div class="hero">
      <span class="halo"></span>
      <span style="position:relative"><${Shield} s=${92} /></span>
      <${Wordmark} />
      <p class="muted" style="position:relative;max-width:320px;line-height:1.55;margin-top:4px">Le réseau des professionnels chrétiens : se connecter, s'entraider, entreprendre et acheter entre membres de confiance.</p>
    </div>
    <div class="col" style="padding:0 20px;gap:8px">
      <div class="feature"><span class="ic"><${Icon} n="users" c="#8E6A1C" /></span><span><b>Un réseau vérifié</b><br /><span class="small muted">Chaque membre est validé avec sa carte de membre d'église.</span></span></div>
      <div class="feature"><span class="ic"><${Icon} n="brief" c="#8E6A1C" /></span><span><b>Emplois, services et affaires</b><br /><span class="small muted">Des offres d'emploi validées par l'administrateur.</span></span></div>
      <div class="feature"><span class="ic" style="background:#FFC93C"><${Bag} s=${26} /></span><span><b>Joyau, la boutique intégrée</b><br /><span class="small muted">Achetez aux membres, commandez sur WhatsApp.</span></span></div>
    </div>
    <div class="col" style="padding:22px 20px 32px;gap:10px;margin-top:auto">
      <button class="btn btn-gold btn-block" style="height:54px" onClick=${() => { UI.start = "signup"; rerender(); }}>Rejoindre Force Chrétienne</button>
      <button class="btn btn-line btn-block" onClick=${() => { UI.start = "login"; rerender(); }}>J'ai déjà un compte</button>
      <button class="btn btn-block" style="background:#FFF7DD;color:#1F3FC4" onClick=${() => { S.guest = true; UI.tab = "joyau"; UI.start = ""; rerender(); }}><${Bag} s=${22} /> Découvrir Joyau sans compte</button>
    </div>
  </div>`;
}

function AuthHead({ onBack }) {
  return html`<div class="ov-head" style="position:static;border:0"><button class="icon-btn" aria-label="Retour" onClick=${onBack || (() => { UI.start = ""; rerender(); })}><${Icon} n="back" /></button></div>`;
}

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async e => {
    e.preventDefault(); setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Saisissez une adresse e-mail valide."); return; }
    if (forgot) {
      setBusy(true);
      try { await q(sb.auth.resetPasswordForEmail(email.trim(), { redirectTo: location.origin + location.pathname })); setSent(true); } catch (x) { setErr(errText(x)); }
      setBusy(false); return;
    }
    if (!pw) { setErr("Saisissez votre mot de passe."); return; }
    setBusy(true);
    try { await q(sb.auth.signInWithPassword({ email: email.trim(), password: pw })); UI.start = ""; UI.tab = "home"; S.guest = false; }
    catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  return html`<div class="welcome">
    <${AuthHead} onBack=${forgot ? () => { setForgot(false); setSent(false); setErr(""); } : null} />
    <form class="col" style="padding:8px 20px 32px;gap:16px" onSubmit=${submit}>
      <span class="row"><${Shield} s=${46} /><span class="brand-name" style="font-size:18px">FORCE<br />CHRÉTIENNE</span></span>
      <h1 style="font-size:28px">${forgot ? "Mot de passe oublié" : "Heureux de vous revoir"}</h1>
      ${forgot && html`<p class="muted" style="line-height:1.5">Entrez votre e-mail : vous recevrez un lien pour choisir un nouveau mot de passe.</p>`}
      <${Field} label="E-mail"><input id="login-email" class="input" type="email" autocomplete="email" value=${email} onInput=${e => setEmail(e.target.value)} placeholder="nom@exemple.com" /><//>
      ${!forgot && html`<${Field} label="Mot de passe"><input id="login-pw" class="input" type="password" autocomplete="current-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>`}
      ${err && html`<span class="err-msg">${err}</span>`}
      ${sent ? html`<div class="demo-note" style="background:var(--ok-soft);color:var(--ok)"><b>E-mail envoyé.</b> Ouvrez le lien reçu (pensez aux courriers indésirables) pour choisir votre nouveau mot de passe.</div>`
        : html`<${Busy} on=${busy} type="submit" cls="btn btn-ink btn-block">${forgot ? "Recevoir le lien" : "Se connecter"}<//>`}
      ${!forgot && html`<button type="button" class="link" style="align-self:center" onClick=${() => { setForgot(true); setErr(""); }}>Mot de passe oublié ?</button>`}
      ${!forgot && html`<p class="small muted center">Pas encore membre ? <button type="button" class="link" onClick=${() => { UI.start = "signup"; rerender(); }}>Créer mon compte</button></p>`}
    </form>
  </div>`;
}

function NewPassword() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault();
    if (pw.length < 8) { setErr("8 caractères minimum."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try { await q(sb.auth.updateUser({ password: pw })); S.recovery = false; toast("Mot de passe modifié."); refresh(); } catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  return html`<div class="welcome"><form class="col" style="padding:40px 20px;gap:16px" onSubmit=${submit}>
    <${Shield} s=${52} /><h1 style="font-size:26px">Nouveau mot de passe</h1>
    <${Field} label="Nouveau mot de passe" hint="8 caractères minimum"><input id="np-1" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
    <${Field} label="Confirmer"><input id="np-2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
    ${err && html`<span class="err-msg">${err}</span>`}
    <${Busy} on=${busy} type="submit">Enregistrer<//>
  </form></div>`;
}

/* Étape 1 : créer le compte (e-mail + mot de passe) */
function Signup() {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [pw2, setPw2] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [check, setCheck] = useState(false);
  const submit = async e => {
    e.preventDefault(); setErr("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErr("Saisissez une adresse e-mail valide."); return; }
    if (pw.length < 8) { setErr("Le mot de passe doit contenir au moins 8 caractères."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try {
      const d = await q(sb.auth.signUp({ email: email.trim(), password: pw, options: { emailRedirectTo: location.origin + location.pathname } }));
      if (d.user && d.user.identities && d.user.identities.length === 0) setErr("Un compte existe déjà avec cet e-mail. Connectez-vous.");
      else if (!d.session) setCheck(true);
      else { UI.start = ""; }
    } catch (x) { setErr(errText(x)); }
    setBusy(false);
  };
  if (check) return html`<div class="welcome"><${AuthHead} /><div class="col" style="padding:8px 20px 32px;gap:16px;align-items:center;text-align:center">
    <span style="width:96px;height:96px;border-radius:30px;background:var(--gold-soft);display:flex;align-items:center;justify-content:center"><${Icon} n="mail" s=${46} c="#8E6A1C" /></span>
    <h1 style="font-size:26px">Confirmez votre e-mail</h1>
    <p class="muted" style="line-height:1.55;max-width:330px">Nous avons envoyé un lien à <b style="color:var(--ink)">${email}</b>. Ouvrez-le pour activer votre compte, puis connectez-vous pour compléter votre profil. Pensez à vérifier les courriers indésirables.</p>
    <button class="btn btn-gold btn-block" onClick=${() => { UI.start = "login"; rerender(); }}>J'ai confirmé, me connecter</button>
  </div></div>`;
  return html`<div class="welcome">
    <${AuthHead} />
    <form class="col" style="padding:8px 20px 32px;gap:16px" onSubmit=${submit}>
      <div class="progress"><span class="on"></span><span></span><span></span><span></span></div>
      <h1 style="font-size:27px">Créer mon compte</h1>
      <p class="muted" style="line-height:1.5">Ensuite, vous compléterez votre profil et votre carte de membre. Votre adhésion sera validée par l'administrateur.</p>
      <${Field} label="E-mail" req><input id="su-email" class="input" type="email" autocomplete="email" value=${email} onInput=${e => setEmail(e.target.value)} placeholder="nom@exemple.com" /><//>
      <${Field} label="Mot de passe" req hint="8 caractères minimum"><input id="su-pw" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
      <${Field} label="Confirmer le mot de passe" req><input id="su-pw2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} type="submit" style="height:54px">Continuer<//>
      <p class="small muted center">Déjà membre ? <button type="button" class="link" onClick=${() => { UI.start = "login"; rerender(); }}>Se connecter</button></p>
    </form>
  </div>`;
}

/* Étapes 2 à 4 : profil, église et carte de membre (compte déjà créé) */
function ProfileSetup({ redo }) {
  const me = S.me || {};
  const [step, setStep] = useState(redo ? 1 : 0);
  const [f, setF] = useState({ nom: me.nom || "", prenoms: me.prenoms || "", naissance: me.naissance || "", profession: me.profession || "", entreprise: me.entreprise || "", eglise: me.eglise || "", assemblee: me.assemblee || "", ville: me.ville || "", tel: me.tel || "", whatsapp: me.whatsapp || "", accept: !!redo });
  const [photo, setPhoto] = useState(null); const [photoPrev, setPhotoPrev] = useState(me.photo_url || "");
  const [carteMode, setCarteMode] = useState("photos");
  const [carte, setCarte] = useState(null); const [cartePrev, setCartePrev] = useState("");
  const [verso, setVerso] = useState(null); const [versoPrev, setVersoPrev] = useState("");
  const [pdf, setPdf] = useState(null);
  const [errs, setErrs] = useState({}); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const need = [["nom", "prenoms", "naissance", "photo"], ["profession", "eglise", "assemblee", "carte"], ["tel", "accept"]];
  const next = async () => {
    const e = {};
    need[step].forEach(k => {
      if (k === "photo") { if (!photo && !photoPrev) e.photo = "Ajoutez une photo de profil."; }
      else if (k === "carte") {
        if (carteMode === "pdf") { if (!pdf) e.carte = "Ajoutez le fichier PDF de votre carte de membre (recto et verso)."; }
        else if (!carte || !verso) e.carte = !carte && !verso ? "Ajoutez les photos du recto et du verso de votre carte." : !carte ? "Ajoutez la photo du recto de votre carte." : "Ajoutez la photo du verso de votre carte.";
      }
      else if (k === "accept") { if (!f.accept) e.accept = "Veuillez accepter la charte pour continuer."; }
      else if (k === "tel") { if (String(f.tel || "").replace(/\D/g, "").length < 8) e.tel = f.tel.trim() ? "Numéro de téléphone incomplet." : "Le téléphone est obligatoire."; }
      else if (!String(f[k] || "").trim()) e[k] = "Ce champ est obligatoire.";
    });
    setErrs(e);
    if (Object.keys(e).length) return;
    if (step < 2) { setStep(step + 1); try { window.scrollTo(0, 0); } catch (x) {} return; }
    setBusy(true);
    try {
      let photo_url = me.photo_url || "";
      if (photo) photo_url = publicUrl("avatars", await uploadFile("avatars", photo, "photo"));
      let carte_path = me.carte_path || "", carte_verso_path = me.carte_verso_path || "";
      if (carteMode === "pdf" && pdf) { carte_path = await uploadRaw("cards", pdf, "carte", "pdf", "application/pdf"); carte_verso_path = ""; }
      else if (carte && verso) { carte_path = await uploadFile("cards", carte, "carte-recto"); carte_verso_path = await uploadFile("cards", verso, "carte-verso"); }
      const row = { id: uid(), nom: f.nom.trim().toUpperCase(), prenoms: f.prenoms.trim(), naissance: f.naissance || null, profession: f.profession.trim(), entreprise: f.entreprise.trim(), eglise: f.eglise.trim(), assemblee: f.assemblee.trim(), ville: f.ville.trim(), tel: f.tel.trim(), whatsapp: f.whatsapp.trim(), mail: S.session.user.email, photo_url, carte_path, carte_verso_path };
      if (S.me) await q(sb.from("profiles").update(row).eq("id", uid()));
      else await q(sb.from("profiles").insert(row));
      await loadMe(); refresh();
      toast(isMember() ? "Bienvenue !" : "Candidature envoyée.");
    } catch (x) { fail(x); }
    setBusy(false);
  };
  const titles = ["Qui êtes-vous ?", "Votre vie pro et votre église", "Vos coordonnées"];
  return html`<div class="welcome">
    <div class="ov-head"><button class="icon-btn" aria-label=${step ? "Étape précédente" : "Se déconnecter"} onClick=${() => { if (step > (redo ? 1 : 0)) setStep(step - 1); else signOut(); }}><${Icon} n=${step > (redo ? 1 : 0) ? "back" : "logout"} /></button><h1>${redo ? "Mettre à jour mon adhésion" : "Mon profil · étape " + (step + 2) + " sur 4"}</h1></div>
    <div class="col" style="padding:16px 20px 36px;gap:16px">
      <div class="progress"><span class="on"></span>${[0, 1, 2].map(i => html`<span key=${i} class=${i <= step ? "on" : ""}></span>`)}</div>
      <h2 style="font-size:25px">${titles[step]}</h2>
      ${step === 0 && html`
        <${Field} label="Nom" req err=${errs.nom}><input id="pf-nom" class=${"input" + (errs.nom ? " err" : "")} value=${f.nom} onInput=${set("nom")} placeholder="KOUADIO" autocomplete="family-name" /><//>
        <${Field} label="Prénoms" req err=${errs.prenoms}><input id="pf-prenoms" class=${"input" + (errs.prenoms ? " err" : "")} value=${f.prenoms} onInput=${set("prenoms")} placeholder="Ulrich Emmanuel" autocomplete="given-name" /><//>
        <${Field} label="Date de naissance" req err=${errs.naissance}><input id="pf-naissance" type="date" class=${"input" + (errs.naissance ? " err" : "")} value=${f.naissance} onInput=${set("naissance")} /><//>
        <${Field} label="Photo de profil" req err=${errs.photo}><${Upload} id="pf-photo" label="Ajouter votre photo" sub="Visage bien visible, de face" preview=${photoPrev} max=${500} onFile=${(b, u) => { setPhoto(b); setPhotoPrev(u); }} /><//>`}
      ${step === 1 && html`
        ${redo && html`<div class="demo-note" style="background:var(--warn-soft);color:var(--warn)">Votre adhésion n'a pas pu être validée. Vérifiez vos informations et envoyez le recto et le verso de votre carte de membre à jour.</div>`}
        <${Field} label="Profession" req err=${errs.profession}><input id="pf-profession" class=${"input" + (errs.profession ? " err" : "")} value=${f.profession} onInput=${set("profession")} placeholder="Responsable commercial" /><//>
        <${Field} label="Entreprise / Administration" hint="Entreprise privée, administration publique, ONG ou activité indépendante. Facultatif."><input id="pf-entreprise" class="input" value=${f.entreprise} onInput=${set("entreprise")} placeholder="Ex. Groupe Horizon, Ministère de la Santé…" /><//>
        <${Field} label="Église" req err=${errs.eglise}><input id="pf-eglise" class=${"input" + (errs.eglise ? " err" : "")} value=${f.eglise} onInput=${set("eglise")} placeholder="Église Évangélique Bethel" /><//>
        <${Field} label="Assemblée" req err=${errs.assemblee}><input id="pf-assemblee" class=${"input" + (errs.assemblee ? " err" : "")} value=${f.assemblee} onInput=${set("assemblee")} placeholder="Assemblée de Cocody Angré" /><//>
        <${Field} label="Carte de membre" req err=${errs.carte} hint="Carte à jour, signée par l'autorité ecclésiastique. Seuls les administrateurs la voient.">
          <div class="seg" style="margin-bottom:4px"><button type="button" class=${carteMode === "photos" ? "on" : ""} onClick=${() => { setCarteMode("photos"); setErrs(Object.assign({}, errs, { carte: "" })); }}>Photos recto / verso</button><button type="button" class=${carteMode === "pdf" ? "on" : ""} onClick=${() => { setCarteMode("pdf"); setErrs(Object.assign({}, errs, { carte: "" })); }}>Fichier PDF</button></div>
          ${carteMode === "photos" ? html`<div class="col" style="gap:8px">
            <${Upload} id="pf-carte" icon="card" label="Recto de la carte" done="Recto ajouté · changer" sub="Face avant, lisible, sans reflet" preview=${cartePrev} max=${1400} onFile=${(b, u) => { setCarte(b); setCartePrev(u); }} />
            <${Upload} id="pf-carte-verso" icon="card" label="Verso de la carte" done="Verso ajouté · changer" sub="Face arrière, avec la signature" preview=${versoPrev} max=${1400} onFile=${(b, u) => { setVerso(b); setVersoPrev(u); }} />
          </div>` : html`<div class="col" style="gap:8px">
            <div class="demo-note" style="background:var(--gold-soft);color:#5B4612"><b>Important :</b> le fichier PDF doit contenir le recto et le verso de votre carte de membre.</div>
            <${PdfUpload} id="pf-carte-pdf" label="Choisir le fichier PDF" sub="Recto et verso · 6 Mo maximum" file=${pdf} onFile=${setPdf} />
          </div>`}
        <//>`}
      ${step === 2 && html`
        <p class="muted small">Le téléphone est obligatoire. La ville et le WhatsApp sont facultatifs, mais utiles pour que les membres vous joignent.</p>
        <${Field} label="Ville"><input id="pf-ville" class="input" value=${f.ville} onInput=${set("ville")} placeholder="Abidjan" /><//>
        <${Field} label="Téléphone" req err=${errs.tel}><input id="pf-tel" class=${"input" + (errs.tel ? " err" : "")} type="tel" inputmode="tel" autocomplete="tel" value=${f.tel} onInput=${set("tel")} placeholder="07 00 00 00 00" /><//>
        <${Field} label="WhatsApp" hint="Indispensable pour vendre sur Joyau : les commandes arrivent sur ce numéro."><input id="pf-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} placeholder="07 00 00 00 00" /><//>
        <label class="row" style="align-items:flex-start;gap:10px;font-size:14px;line-height:1.5"><input id="pf-accept" type="checkbox" checked=${f.accept} onChange=${set("accept")} style="width:20px;height:20px;margin-top:2px;accent-color:#B8892B" /><span>J'adhère à la charte de Force Chrétienne : respect, honnêteté dans les affaires et bienveillance entre membres.</span></label>
        ${errs.accept && html`<span class="err-msg">${errs.accept}</span>`}`}
      <${Busy} on=${busy} style="height:54px;margin-top:6px" onClick=${next}>${step < 2 ? "Continuer" : redo ? "Renvoyer ma demande" : "Envoyer ma candidature"}<//>
      <p class="tiny muted center">Les champs marqués <b style="color:var(--gold-ink)">*</b> sont obligatoires.</p>
    </div>
  </div>`;
}

function Pending() {
  const me = S.me;
  const [busy, setBusy] = useState(false);
  const check = async () => { setBusy(true); await loadMe(); setBusy(false); if (isMember()) { toast("Adhésion validée. Bienvenue !"); UI.tab = "home"; } else toast("Toujours en cours de vérification."); refresh(); };
  return html`<div class="welcome">
    <div class="hero" style="padding-top:56px">
      <span class="halo"></span>
      <span style="position:relative;width:96px;height:96px;border-radius:30px;background:var(--gold-soft);display:flex;align-items:center;justify-content:center"><${Icon} n="shield" s=${46} c="#8E6A1C" /></span>
      <h1 style="position:relative;font-size:26px">Candidature envoyée</h1>
      <p class="muted" style="position:relative;max-width:330px;line-height:1.55">Merci ${me.prenoms.split(" ")[0]} ! Un administrateur vérifie votre carte de membre. Vous recevrez une notification dès que votre compte sera validé.</p>
    </div>
    <div class="col" style="padding:0 20px;gap:10px">
      <div class="card row"><${Avatar} p=${me} size=${52} /><span class="grow"><b>${fullName(me)}</b><br /><span class="small muted">${me.profession} · ${me.eglise}</span></span><span class="pill pill-warn">En attente</span></div>
      <${PushCard} title="Soyez prévenu de la validation" text="Recevez une notification sur ce téléphone dès que l'administrateur aura validé votre adhésion, même si l'application est fermée." />
      <div class="feature"><span class="ic" style="background:#FFC93C"><${Bag} s=${24} /></span><span class="grow"><b>En attendant, faites vos achats</b><br /><span class="small muted">Joyau est ouvert à tous.</span></span></div>
    </div>
    <div class="col" style="padding:22px 20px 32px;gap:10px;margin-top:auto">
      <button class="btn btn-block" style="background:#FFC93C;color:#0B1B3F" onClick=${() => { S.guest = true; UI.tab = "joyau"; rerender(); }}>Aller sur Joyau</button>
      <${Busy} on=${busy} cls="btn btn-line btn-block" onClick=${check}><${Icon} n="refresh" s=${18} />Vérifier l'état de ma demande<//>
      <button class="link" style="align-self:center;margin-top:4px" onClick=${signOut}>Se déconnecter</button>
    </div>
  </div>`;
}

/* ===== Réseau social : fil, réseau, profils, messagerie, notifications ===== */
const fetchUnread = async () => {
  if (!isMember()) return { notifs: 0, msgs: 0 };
  const [n, m] = await Promise.all([
    sb.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", uid()).eq("read", false),
    sb.from("messages").select("id", { count: "exact", head: true }).eq("recipient", uid()).is("read_at", null)
  ]);
  return { notifs: n.count || 0, msgs: m.count || 0 };
};
function useUnread() { return useData("unread", fetchUnread).data || { notifs: 0, msgs: 0 }; }

function TopBar() {
  const u = useUnread();
  return html`<header class="topbar">
    <span class="brand grow"><${Shield} s=${36} /><span class="brand-name">FORCE CHRÉTIENNE<small>RAYONNER ENSEMBLE</small></span></span>
    <button class="icon-btn" aria-label=${"Notifications" + (u.notifs ? ", " + u.notifs + " nouvelles" : "")} onClick=${() => push("notifs")}><${Icon} n="bell" s=${21} />${u.notifs ? html`<span class="badge">${u.notifs}</span>` : ""}</button>
    <button style="border:0;background:none;padding:0" aria-label="Mon profil" onClick=${() => push("profile", { id: uid() })}><${Avatar} p=${S.me} size=${40} /></button>
  </header>`;
}

/* ---------- Fil ---------- */
const POST_SEL = "*, author_p:profiles!posts_author_fkey(" + PROFILE_COLS + "), post_likes(user_id), comments(count)";
function PostCard({ p }) {
  const [open, setOpen] = useState(false);
  const [txt, setTxt] = useState("");
  const [menu, setMenu] = useState(false);
  const comments = useData("comments:" + p.id + (open ? "" : ":closed"), () => open ? q(sb.from("comments").select("*, author_p:profiles!comments_author_fkey(" + PROFILE_COLS + ")").eq("post_id", p.id).order("created_at")) : Promise.resolve([]), [open]);
  const m = p.author_p;
  const liked = (p.post_likes || []).some(l => l.user_id === uid());
  const nLikes = (p.post_likes || []).length;
  const nCom = p.comments && p.comments[0] ? p.comments[0].count : 0;
  const like = async () => { try { if (liked) await q(sb.from("post_likes").delete().eq("post_id", p.id).eq("user_id", uid())); else await q(sb.from("post_likes").insert({ post_id: p.id, user_id: uid() })); refresh(); } catch (e) { fail(e); } };
  const send = async e => { e.preventDefault(); if (!txt.trim()) return; try { await q(sb.from("comments").insert({ post_id: p.id, author: uid(), text: txt.trim() })); setTxt(""); refresh(); } catch (x) { fail(x); } };
  const del = () => openSheet("confirm", { title: "Supprimer cette publication ?", text: "Elle disparaîtra du fil pour tous les membres.", ok: "Supprimer", fn: async () => { await q(sb.from("posts").delete().eq("id", p.id)); toast("Publication supprimée."); } });
  const share = () => { const t = p.text + "\n\n— " + fullName(m) + " sur Force Chrétienne"; if (navigator.share) navigator.share({ text: t }).catch(() => {}); else if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => toast("Texte copié.")); };
  return html`<article class="post">
    <div class="row">
      <button style="border:0;background:none;padding:0" aria-label=${"Profil de " + fullName(m)} onClick=${() => push("profile", { id: p.author })}><${Avatar} p=${m} size=${46} /></button>
      <span class="grow" style="min-width:0"><b style="font-size:15px">${fullName(m)}</b><${Verified} /><br /><span class="tiny muted">${jobLine(m)} · ${ago(p.created_at)}</span></span>
      ${p.kind !== "Publication" && html`<span class="pill pill-gold">${p.kind}</span>`}
      ${(p.author === uid() || isAdmin()) && html`<button class="icon-btn" style="width:34px;height:34px;background:none" aria-label="Supprimer la publication" onClick=${del}><${Icon} n="trash" s=${17} c="#63666F" /></button>`}
    </div>
    <p class="txt">${p.text}</p>
    ${p.image_url && html`<div class="media"><img src=${p.image_url} alt="Photo jointe à la publication" loading="lazy" /></div>`}
    <div class="row tiny muted" style="margin-top:10px;justify-content:space-between"><span>${nLikes} j'aime</span><span>${nCom} commentaire${nCom > 1 ? "s" : ""}</span></div>
    <div class="acts">
      <button class=${liked ? "on" : ""} onClick=${like} aria-pressed=${liked}><${Icon} n="like" s=${19} fill=${liked ? "#F7EED6" : "none"} />J'aime</button>
      <button onClick=${() => setOpen(!open)}><${Icon} n="comment" s=${19} />Commenter</button>
      <button onClick=${share}><${Icon} n="share" s=${19} />Partager</button>
    </div>
    ${open && html`<div class="col" style="gap:10px;margin-top:8px">
      ${comments.loading && html`<span class="small muted">Chargement…</span>`}
      ${(comments.data || []).map(c => html`<div key=${c.id} class="row" style="align-items:flex-start"><${Avatar} p=${c.author_p} size=${32} /><span class="grow" style="background:var(--soft);border-radius:4px 14px 14px 14px;padding:8px 12px"><b class="small">${fullName(c.author_p)}</b> <span class="tiny muted">${ago(c.created_at)}</span><br /><span style="font-size:14px;line-height:1.5">${c.text}</span></span></div>`)}
      <form class="row" onSubmit=${send}><${Avatar} p=${S.me} size=${32} /><input id=${"cm-" + p.id} class="input" style="height:42px;border-radius:999px" value=${txt} onInput=${e => setTxt(e.target.value)} placeholder="Écrire un commentaire…" /><button class="send" style="width:42px;height:42px" aria-label="Envoyer le commentaire"><${Icon} n="send" s=${18} c="#23262D" /></button></form>
    </div>`}
  </article>`;
}

function HomeTab() {
  const posts = useData("posts", () => q(sb.from("posts").select(POST_SEL).order("created_at", { ascending: false }).limit(40)));
  const prods = useData("joyau-strip", () => q(sb.from("products").select("id,name,price,photo_url").eq("status", "online").order("created_at", { ascending: false }).limit(8)));
  const job = useData("home-job", () => q(sb.from("jobs").select("*").eq("status", "online").order("created_at", { ascending: false }).limit(1)));
  const list = posts.data || [];
  const strip = html`${(prods.data || []).length > 0 && html`<section style="padding:16px 16px 18px;border-bottom:8px solid var(--soft);margin:0 -16px" class="j-scope">
      <div class="row" style="justify-content:space-between;margin-bottom:12px"><${JoyauLogo} slogan=${false} /><button class="link" onClick=${() => go("joyau")}>Voir la boutique</button></div>
      <div class="hscroll">${prods.data.map(p => html`<button key=${p.id} class="pcard" style="width:150px;flex:none" onClick=${() => push("product", { id: p.id })}><span class="ph" style="height:104px"><img class="photo" src=${p.photo_url} alt=${p.name} loading="lazy" /></span><span class="nm">${p.name}</span><span class="pr">${fmt(p.price)}</span></button>`)}</div>
    </section>`}`;
  const jobBlock = html`${job.data && job.data[0] && html`<section style="padding:16px;border-bottom:8px solid var(--soft);margin:0 -16px">
      <div class="row" style="justify-content:space-between;margin-bottom:10px"><b class="kind-tag">Offre d'emploi validée</b><button class="link" onClick=${() => { UI.opp = "jobs"; go("opps"); }}>Toutes les offres</button></div>
      <${JobCard} j=${job.data[0]} />
    </section>`}`;
  return html`<div class="page">
    <div style="padding-top:14px">
      <button class="composer" onClick=${() => push("compose")}><${Avatar} p=${S.me} size=${40} /><span class="ph">Partagez une réussite, une offre, un témoignage…</span><${Icon} n="photo" c="#8E6A1C" /></button>
    </div>
    <div class="row" style="margin-top:12px;gap:8px">
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("compose", { kind: "Témoignage" })}><${Icon} n="star" s=${17} c="#8E6A1C" />Témoignage</button>
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("jobForm")}><${Icon} n="brief" s=${17} c="#8E6A1C" />Emploi</button>
      <button class="btn btn-ghost btn-sm grow" onClick=${() => push("compose", { kind: "Événement" })}><${Icon} n="calendar" s=${17} c="#8E6A1C" />Événement</button>
    </div>
    ${!UI.pushHidden && html`<div style="margin-top:12px;position:relative"><${PushCard} compact onDone=${() => { UI.pushHidden = true; }} /></div>`}
    ${posts.loading && !list.length && html`<${Loading} />`}
    ${list.slice(0, 2).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${strip}
    ${list.slice(2, 4).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${jobBlock}
    ${list.slice(4).map(p => html`<${PostCard} key=${p.id} p=${p} />`)}
    ${!posts.loading && !list.length && html`<${Empty} icon="star" title="Soyez le premier à publier" text="Présentez-vous, partagez un témoignage ou une opportunité : le fil de Force Chrétienne commence avec vous." />`}
    ${list.length > 0 && html`<p class="center tiny muted" style="padding:24px 0">Vous êtes à jour. Que Dieu bénisse votre journée, ${S.me.prenoms.split(" ")[0]} !</p>`}
    <button class="fab" aria-label="Nouvelle publication" onClick=${() => push("compose")}><${Icon} n="plus" s=${26} c="#23262D" w=${2.4} /></button>
  </div>`;
}

function Compose({ kind: k0 }) {
  const [kind, setKind] = useState(k0 || "Publication");
  const [text, setText] = useState("");
  const [img, setImg] = useState(null); const [prev, setPrev] = useState("");
  const [busy, setBusy] = useState(false);
  const publish = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const image_url = img ? publicUrl("posts", await uploadFile("posts", img, "post")) : "";
      await q(sb.from("posts").insert({ author: uid(), kind, text: text.trim(), image_url }));
      UI.stack = []; UI.tab = "home"; refresh(); toast("Publication en ligne.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <${OvHead} title="Nouvelle publication" right=${html`<${Busy} on=${busy} cls="btn btn-gold btn-sm" disabled=${!text.trim()} onClick=${publish}>Publier<//>`} />
    <div class="ov-body col" style="gap:16px">
      <div class="row"><${Avatar} p=${S.me} size=${46} /><span><b>${fullName(S.me)}</b><br /><span class="tiny muted">Visible par tous les membres</span></span></div>
      <div class="chips" style="margin:0;padding:0">${["Publication", "Témoignage", "Événement", "Annonce"].map(x => html`<button key=${x} class=${"chip" + (x === kind ? " on" : "")} onClick=${() => setKind(x)}>${x}</button>`)}</div>
      <textarea id="compose-text" class="input" style="min-height:170px;font-size:16.5px;border:0;padding:4px 0" value=${text} onInput=${e => setText(e.target.value)} placeholder=${kind === "Témoignage" ? "Racontez ce que Dieu a fait dans votre vie professionnelle…" : kind === "Événement" ? "Quoi, où, quand ? Comment s'inscrire ?" : "De quoi voulez-vous parler ?"}></textarea>
      ${prev ? html`<div style="position:relative"><img src=${prev} alt="Aperçu" style="width:100%;border-radius:16px;display:block" /><button class="icon-btn" aria-label="Retirer la photo" style="position:absolute;top:8px;right:8px;background:#fff" onClick=${() => { setImg(null); setPrev(""); }}><${Icon} n="close" /></button></div>`
        : html`<${Upload} id="compose-img" icon="photo" label="Ajouter une photo" sub="Facultatif" max=${1400} onFile=${(b, u) => { setImg(b); setPrev(u); }} />`}
    </div>
  </div>`;
}

/* ---------- Réseau ---------- */
const fetchConns = () => q(sb.from("connections").select("*").or("requester.eq." + uid() + ",addressee.eq." + uid()));
const fetchMembers = () => q(sb.from("profiles").select(PROFILE_COLS + ",secteur").eq("status", "active").neq("id", uid()).order("created_at", { ascending: false }).limit(1000));
function connState(conns, id) {
  const c = (conns || []).find(x => (x.requester === id && x.addressee === uid()) || (x.addressee === id && x.requester === uid()));
  if (!c) return { st: "none" };
  if (c.status === "accepted") return { st: "conn", c };
  return { st: c.requester === uid() ? "sent" : "invite", c };
}
async function connect(id) { try { await q(sb.from("connections").insert({ requester: uid(), addressee: id })); toast("Demande envoyée."); refresh(); } catch (e) { fail(e); } }
async function acceptConn(c) { try { await q(sb.from("connections").update({ status: "accepted" }).eq("id", c.id)); toast("Nouvelle relation ajoutée."); refresh(); } catch (e) { fail(e); } }
async function removeConn(c) { try { await q(sb.from("connections").delete().eq("id", c.id)); refresh(); } catch (e) { fail(e); } }

function NetworkTab() {
  const [mode, setMode] = useState(UI.net || "mine");
  const [qq, setQ] = useState("");
  const conns = useData("conns", fetchConns);
  const mem = useData("members", fetchMembers);
  const setM = v => { UI.net = v; setMode(v); };
  const members = mem.data || [];
  const byId = id => members.find(m => m.id === id);
  const cs = conns.data || [];
  const invites = cs.filter(c => c.status === "pending" && c.addressee === uid()).map(c => ({ c, m: byId(c.requester) })).filter(x => x.m);
  const rel = cs.filter(c => c.status === "accepted").map(c => byId(c.requester === uid() ? c.addressee : c.requester)).filter(Boolean);
  const ql = qq.toLowerCase();
  const all = members.filter(m => !ql || [fullName(m), m.profession, m.entreprise, m.eglise, m.assemblee, m.ville].join(" ").toLowerCase().includes(ql));
  return html`<div class="page">
    <div style="padding-top:14px"><div class="seg"><button class=${mode === "mine" ? "on" : ""} onClick=${() => setM("mine")}>Mon réseau</button><button class=${mode === "all" ? "on" : ""} onClick=${() => setM("all")}>Tous les membres</button></div></div>
    ${(conns.loading || mem.loading) && !members.length ? html`<${Loading} />` : mode === "mine" ? html`
      ${invites.length > 0 && html`<div class="section-title"><h2>Invitations</h2><span class="pill pill-gold">${invites.length}</span></div>
        ${invites.map(({ c, m }) => html`<div key=${c.id} class="card row" style="margin-bottom:10px;align-items:flex-start">
          <button style="border:0;background:none;padding:0" onClick=${() => push("profile", { id: m.id })}><${Avatar} p=${m} size=${50} /></button>
          <span class="grow col" style="gap:8px"><span><b>${fullName(m)}</b><br /><span class="small muted">${jobLine(m)}</span></span>
            <span class="row" style="gap:8px"><button class="btn btn-ink btn-sm grow" onClick=${() => acceptConn(c)}>Accepter</button><button class="btn btn-ghost btn-sm grow" onClick=${() => removeConn(c)}>Ignorer</button></span></span>
        </div>`)}`}
      <div class="section-title"><h2>Mes relations</h2><span class="small muted">${rel.length}</span></div>
      ${rel.length ? rel.map(m => html`<${MemberRow} key=${m.id} m=${m} conns=${cs} />`) : html`<${Empty} icon="users" title="Pas encore de relations" text="Parcourez les membres et envoyez vos premières demandes de mise en relation." />`}
      <button class="btn btn-line btn-block" style="margin-top:16px" onClick=${() => setM("all")}>Trouver des membres</button>
    ` : html`
      <div class="search" style="margin-top:14px"><${Icon} n="search" s=${19} c="#63666F" /><input id="net-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Nom, métier, église, ville…" /></div>
      <p class="small muted" style="margin:12px 0 4px">${all.length} membre${all.length > 1 ? "s" : ""} vérifié${all.length > 1 ? "s" : ""}</p>
      ${all.map(m => html`<${MemberRow} key=${m.id} m=${m} conns=${cs} action />`)}
      ${!all.length && html`<${Empty} icon="search" title=${members.length ? "Aucun membre trouvé" : "Les premiers membres arrivent"} text=${members.length ? "Essayez un autre mot." : "Les membres apparaîtront ici dès que l'administrateur aura validé leur adhésion."} />`}
    `}
  </div>`;
}
function MemberRow({ m, conns, action }) {
  const { st } = connState(conns, m.id);
  return html`<div class="list-row">
    <button style="border:0;background:none;padding:0" onClick=${() => push("profile", { id: m.id })} aria-label=${"Profil de " + fullName(m)}><${Avatar} p=${m} size=${50} /></button>
    <button class="grow" style="border:0;background:none;padding:0;text-align:left;min-width:0" onClick=${() => push("profile", { id: m.id })}><b>${fullName(m)}</b><${Verified} s=${14} /><br /><span class="small muted">${jobLine(m)}</span><br /><span class="tiny muted">${m.eglise}${m.ville ? " · " + m.ville : ""}</span></button>
    ${action && st === "none" ? html`<button class="btn btn-line btn-sm" onClick=${() => connect(m.id)}>Se connecter</button>`
      : action && st === "sent" ? html`<span class="pill pill-grey">En attente</span>`
      : html`<button class="icon-btn" aria-label=${"Écrire à " + fullName(m)} onClick=${() => openChat(m.id)}><${Icon} n="chat" s=${20} /></button>`}
  </div>`;
}

function Profile({ id }) {
  if (id === uid()) return html`<${MyProfile} />`;
  const pr = useData("profile:" + id, () => q(sb.from("profiles").select("*").eq("id", id).maybeSingle()));
  const conns = useData("conns", fetchConns);
  const posts = useData("posts-of:" + id, () => q(sb.from("posts").select(POST_SEL).eq("author", id).order("created_at", { ascending: false }).limit(20)));
  const servs = useData("services-of:" + id, () => q(sb.from("services").select("*").eq("author", id)));
  const prods = useData("products-of:" + id, () => q(sb.from("products").select("*, shops(name,city,whatsapp)").eq("owner", id).eq("status", "online")));
  const m = pr.data;
  if (pr.loading && !m) return html`<div class="overlay"><${OvHead} title="Profil" /><${Loading} /></div>`;
  if (!m) return html`<div class="overlay"><${OvHead} title="Profil" /><${Empty} title="Ce profil n'est pas disponible" /></div>`;
  const cs = connState(conns.data, id);
  return html`<div class="overlay">
    <${OvHead} title=${fullName(m)} />
    <div class="cover"></div>
    <div style="padding:0 16px;margin-top:-46px;position:relative" class="col">
      <span style="border:4px solid #fff;border-radius:999px;align-self:flex-start"><${Avatar} p=${m} size=${92} /></span>
      <h2 style="font-size:23px">${fullName(m)}<${Verified} s=${18} /></h2>
      <p class="muted">${jobLine(m)}</p>
      ${m.bio && html`<p style="line-height:1.55;font-size:14.5px">${m.bio}</p>`}
      <div class="col small" style="gap:6px;margin-top:2px">
        <span class="row" style="gap:8px"><${Icon} n="church" s=${17} c="#8E6A1C" />${m.eglise}, ${m.assemblee}</span>
        ${m.ville && html`<span class="row" style="gap:8px"><${Icon} n="pin" s=${17} c="#8E6A1C" />${m.ville}</span>`}
        ${cs.st === "conn" && (m.whatsapp || m.tel) && html`<span class="row" style="gap:8px"><${Icon} n="phone" s=${17} c="#8E6A1C" />${m.whatsapp || m.tel}</span>`}
      </div>
      <div class="row" style="margin-top:8px">
        ${cs.st === "conn" ? html`<button class="btn btn-ghost btn-sm grow" onClick=${() => openSheet("confirm", { title: "Retirer cette relation ?", text: fullName(m) + " ne fera plus partie de votre réseau.", ok: "Retirer", fn: async () => { await q(sb.from("connections").delete().eq("id", cs.c.id)); } })}><${Icon} n="check" s=${17} />Relation</button>`
          : cs.st === "sent" ? html`<span class="btn btn-ghost btn-sm grow">Demande envoyée</span>`
          : cs.st === "invite" ? html`<button class="btn btn-ink btn-sm grow" onClick=${() => acceptConn(cs.c)}>Accepter l'invitation</button>`
          : html`<button class="btn btn-ink btn-sm grow" onClick=${() => connect(id)}>Se connecter</button>`}
        <button class="btn btn-gold btn-sm grow" onClick=${() => openChat(id)}><${Icon} n="chat" s=${17} />Message</button>
      </div>
    </div>
    <div class="ov-body" style="padding-top:8px">
      ${(servs.data || []).map(s => html`<div key=${s.id} class="card" style="margin-top:12px"><span class="kind-tag">Service proposé</span><p class="bold" style="margin-top:6px">${s.title}</p><p class="small muted" style="margin-top:4px">${s.price}</p></div>`)}
      ${(prods.data || []).length > 0 && html`<div class="j-scope"><div class="section-title"><h2>Sa boutique Joyau</h2></div><div class="pgrid">${prods.data.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div></div>`}
      <div class="section-title"><h2>Publications</h2></div>
      ${(posts.data || []).length ? posts.data.map(p => html`<${PostCard} key=${p.id} p=${p} />`) : html`<p class="small muted">Aucune publication pour l'instant.</p>`}
    </div>
  </div>`;
}

/* ---------- Messagerie ---------- */
const MSG_SEL = "*, s:profiles!messages_sender_fkey(" + PROFILE_COLS + "), r:profiles!messages_recipient_fkey(" + PROFILE_COLS + ")";
function openChat(id) {
  if (!isMember()) { openSheet("join", { what: "La messagerie" }); return; }
  push("chat", { id });
}
function MessagesTab() {
  const [qq, setQ] = useState("");
  const msgs = useData("inbox", () => q(sb.from("messages").select(MSG_SEL).or("sender.eq." + uid() + ",recipient.eq." + uid()).order("created_at", { ascending: false }).limit(800)));
  const convs = [];
  const seen = {};
  (msgs.data || []).forEach(x => {
    const other = x.sender === uid() ? x.r : x.s; if (!other) return;
    if (!seen[other.id]) { seen[other.id] = { other, last: x, unread: 0 }; convs.push(seen[other.id]); }
    if (x.recipient === uid() && !x.read_at) seen[other.id].unread++;
  });
  const list = convs.filter(c => !qq || fullName(c.other).toLowerCase().includes(qq.toLowerCase()));
  return html`<div class="page">
    <div class="row" style="padding-top:14px">
      <div class="search grow"><${Icon} n="search" s=${19} c="#63666F" /><input id="msg-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Rechercher une conversation" /></div>
      <button class="icon-btn" style="width:50px;height:50px;background:var(--ink)" aria-label="Nouveau message" onClick=${() => openSheet("newMsg")}><${Icon} n="edit" c="#fff" /></button>
    </div>
    <div style="margin-top:6px">
      ${msgs.loading && !msgs.data && html`<${Loading} />`}
      ${list.map(c => html`<button key=${c.other.id} class="list-row" style="width:100%;border-left:0;border-right:0;border-top:0;background:none;text-align:left" onClick=${() => push("chat", { id: c.other.id })}>
        <${Avatar} p=${c.other} size=${52} />
        <span class="grow" style="min-width:0"><span class="row" style="justify-content:space-between"><b>${fullName(c.other)}</b><span class="tiny muted">${ago(c.last.created_at)}</span></span>
          <span class="row" style="justify-content:space-between"><span class="small" style=${"white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" + (c.unread ? "font-weight:700;color:var(--ink)" : "color:var(--muted)")}>${c.last.sender === uid() ? "Vous : " : ""}${c.last.text}</span>${c.unread ? html`<span class="badge" style="position:static;flex:none">${c.unread}</span>` : ""}</span></span>
      </button>`)}
      ${!msgs.loading && !list.length && html`<${Empty} icon="chat" title="Aucune conversation" text="Écrivez à n'importe quel membre de Force Chrétienne."><button class="btn btn-ink btn-sm" onClick=${() => openSheet("newMsg")}>Nouveau message</button><//>`}
    </div>
  </div>`;
}
function Chat({ id }) {
  const other = useData("profile:" + id, () => q(sb.from("profiles").select(PROFILE_COLS).eq("id", id).maybeSingle()));
  const msgs = useData("thread:" + id, () => q(sb.from("messages").select("*").or("and(sender.eq." + uid() + ",recipient.eq." + id + "),and(sender.eq." + id + ",recipient.eq." + uid() + ")").order("created_at").limit(500)));
  const [t, setT] = useState(""); const [busy, setBusy] = useState(false);
  const end = useRef(null);
  useEffect(() => { try { end.current && end.current.scrollIntoView({ block: "end" }); } catch (e) {} }, [msgs.data && msgs.data.length]);
  useEffect(() => {
    if ((msgs.data || []).some(x => x.recipient === uid() && !x.read_at))
      sb.from("messages").update({ read_at: new Date().toISOString() }).eq("recipient", uid()).eq("sender", id).is("read_at", null).then(() => { delete CACHE.unread; delete CACHE.inbox; });
  }, [msgs.data]);
  const m = other.data;
  const send = async e => {
    e.preventDefault(); if (!t.trim() || busy) return;
    setBusy(true);
    try { await q(sb.from("messages").insert({ sender: uid(), recipient: id, text: t.trim() })); setT(""); refresh(); } catch (x) { fail(x); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <div class="ov-head"><button class="icon-btn" onClick=${back} aria-label="Retour"><${Icon} n="back" /></button>
      <button class="row grow" style="border:0;background:none;padding:0;text-align:left;min-width:0" onClick=${() => push("profile", { id })}><${Avatar} p=${m} size=${40} /><span style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m ? fullName(m) : "…"}</b><span class="tiny muted">${jobLine(m)}</span></span></button></div>
    <div class="thread">
      <span class="pill pill-grey" style="align-self:center">Conversation entre membres vérifiés</span>
      ${(msgs.data || []).map(x => html`<div key=${x.id} class=${"msg " + (x.sender === uid() ? "out" : "in")}>${x.text}<span class="t">${hhmm(x.created_at)}</span></div>`)}
      ${msgs.data && !msgs.data.length && html`<p class="center small muted" style="margin-top:20px">Dites bonjour à ${m ? m.prenoms.split(" ")[0] : "ce membre"} !</p>`}
      <span ref=${end}></span>
    </div>
    <form class="chat-bar" onSubmit=${send}><input id="chat-input" class="input" value=${t} onInput=${e => setT(e.target.value)} placeholder="Votre message…" autocomplete="off" /><button class="send" aria-label="Envoyer" disabled=${busy}><${Icon} n="send" s=${19} c="#23262D" /></button></form>
  </div>`;
}
function NewMsgSheet() {
  const [qq, setQ] = useState("");
  const mem = useData("members", fetchMembers);
  const list = (mem.data || []).filter(m => !qq || fullName(m).toLowerCase().includes(qq.toLowerCase())).slice(0, 60);
  return html`<${Sheet}><h2 style="font-size:19px;margin-bottom:12px">Nouveau message</h2>
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="nm-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Chercher un membre" /></div>
    <div style="margin-top:6px">${list.map(m => html`<button key=${m.id} class="list-row" style="width:100%;border-left:0;border-right:0;border-top:0;background:none;text-align:left" onClick=${() => { UI.sheet = null; openChat(m.id); }}><${Avatar} p=${m} size=${42} /><span class="grow"><b>${fullName(m)}</b><br /><span class="small muted">${jobLine(m)}</span></span></button>`)}
    ${!mem.loading && !list.length && html`<p class="small muted center" style="padding:20px">Aucun membre trouvé.</p>`}</div>
  <//>`;
}

/* ---------- Notifications ---------- */
function Notifs() {
  const n = useData("notifs", () => q(sb.from("notifications").select("*").eq("user_id", uid()).order("created_at", { ascending: false }).limit(80)));
  useEffect(() => () => { sb.from("notifications").update({ read: true }).eq("user_id", uid()).eq("read", false).then(() => { delete CACHE.unread; refresh(); }); }, []);
  const ic = { admin: "shield", person: "users", joyau: "store", comment: "comment", job: "brief", like: "like" };
  const open = x => { const l = x.link || ""; if (l.startsWith("profile:")) push("profile", { id: l.slice(8) }); else if (l === "network") go("network"); else if (l === "opps") { UI.opp = "jobs"; go("opps"); } else if (l === "home") go("home"); else if (l === "admin" && isAdmin()) { UI.stack = []; push("admin"); } };
  return html`<div class="overlay">
    <${OvHead} title="Notifications" right=${html`<button class="link" onClick=${async () => { await sb.from("notifications").update({ read: true }).eq("user_id", uid()); delete CACHE.unread; refresh(); }}>Tout lu</button>`} />
    <div class="ov-body" style="padding-top:4px">
      ${n.loading && !n.data && html`<${Loading} />`}
      ${(n.data || []).map(x => html`<button key=${x.id} class="list-row" style=${"width:100%;border-left:0;border-right:0;border-top:0;text-align:left;" + (x.read ? "background:none" : "background:#FFFBF0;margin:0 -16px;padding-left:16px;padding-right:16px;width:calc(100% + 32px)")} onClick=${() => open(x)}>
        <span class="icon-btn" style=${"flex:none;" + (x.kind === "admin" ? "background:var(--gold-soft)" : "")}><${Icon} n=${ic[x.kind] || "bell"} s=${20} c="#8E6A1C" /></span>
        <span class="grow"><span style="font-size:14.5px;line-height:1.45">${x.text}</span><br /><span class="tiny muted">${ago(x.created_at)}</span></span>
        ${!x.read && html`<span style="width:9px;height:9px;border-radius:9px;background:#C9A24A;flex:none" aria-label="Non lue"></span>`}
      </button>`)}
      ${!n.loading && !(n.data || []).length && html`<${Empty} icon="bell" title="Aucune notification" text="Vous serez prévenu ici des invitations, commentaires et validations." />`}
    </div>
  </div>`;
}

/* ===== Opportunités : emplois, candidatures, services, affaires ===== */
const CO_COLORS = ["#23262D", "#8E6A1C", "#3A3D45", "#5B4612", "#63666F"];
function coColor(s) { let n = 0; for (const c of String(s)) n += c.charCodeAt(0); return CO_COLORS[n % CO_COLORS.length]; }
const fetchMyApps = () => q(sb.from("applications").select("job_id").eq("applicant", uid()));

function JobCard({ j }) {
  const apps = useData("my-apps", fetchMyApps);
  const applied = (apps.data || []).some(a => a.job_id === j.id);
  return html`<button class="card job" style="width:100%;text-align:left" onClick=${() => openSheet("job", { j })}>
    <span class="row" style="align-items:flex-start"><span class="logo-sq" style=${"background:" + coColor(j.company)}>${initials(j.company)}</span>
      <span class="grow"><b style="font-size:15.5px;line-height:1.3">${j.title}</b><br /><span class="small muted">${j.company} · ${j.place}</span></span></span>
    <span class="row" style="gap:6px;flex-wrap:wrap"><span class="pill pill-gold">${j.contract}</span><span class="pill pill-grey">${j.salary}</span>
      ${j.status === "pending" ? html`<span class="pill pill-warn">En attente de validation</span>` : j.status === "refused" ? html`<span class="pill pill-grey">Non validée</span>` : applied ? html`<span class="pill pill-ok"><${Icon} n="check" s=${13} w=${3} />Candidature envoyée</span>` : html`<span class="tiny muted" style="margin-left:auto">${ago(j.created_at)}</span>`}</span>
  </button>`;
}

function OppsTab() {
  const [seg, setSeg] = useState(UI.opp || "jobs");
  const set = v => { UI.opp = v; setSeg(v); };
  return html`<div class="page">
    <div style="padding-top:14px"><div class="seg"><button class=${seg === "jobs" ? "on" : ""} onClick=${() => set("jobs")}>Emplois</button><button class=${seg === "services" ? "on" : ""} onClick=${() => set("services")}>Services</button><button class=${seg === "deals" ? "on" : ""} onClick=${() => set("deals")}>Affaires</button></div></div>
    ${seg === "jobs" ? html`<${Jobs} />` : seg === "services" ? html`<${Services} />` : html`<${Deals} />`}
  </div>`;
}

function Jobs() {
  const [c, setC] = useState("Tous");
  const jobs = useData("jobs", () => q(sb.from("jobs").select("*").or("status.eq.online,author.eq." + uid()).order("created_at", { ascending: false }).limit(200)));
  const all = jobs.data || [];
  const mine = all.filter(j => j.author === uid());
  const list = all.filter(j => j.status === "online" && j.author !== uid() && (c === "Tous" || j.contract === c));
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Offres d'emploi</h2><span class="tiny muted">Toutes validées par l'administrateur</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("jobForm")}><${Icon} n="plus" s=${17} w=${2.6} />Publier</button></div>
    <div class="chips">${["Tous", "CDI", "CDD", "Stage", "Freelance"].map(x => html`<button key=${x} class=${"chip" + (x === c ? " on" : "")} onClick=${() => setC(x)}>${x}</button>`)}</div>
    ${jobs.loading && !jobs.data && html`<${Loading} />`}
    ${mine.length > 0 && html`<p class="kind-tag" style="margin:14px 0 8px">Mes offres</p><div class="col">${mine.map(j => html`<${JobCard} key=${j.id} j=${j} />`)}</div><p class="kind-tag" style="margin:18px 0 8px">Offres des membres</p>`}
    <div class="col" style="margin-top:8px">${list.map(j => html`<${JobCard} key=${j.id} j=${j} />`)}</div>
    ${!jobs.loading && !list.length && html`<${Empty} icon="brief" title="Aucune offre pour l'instant" text="Recrutez parmi des professionnels de confiance : publiez la première offre." />`}
  </div>`;
}

function JobSheet({ j }) {
  const apps = useData("my-apps", fetchMyApps);
  const received = useData("apps-of:" + j.id, () => j.author === uid() ? q(sb.from("applications").select("*, a:profiles!applications_applicant_fkey(" + PROFILE_COLS + ")").eq("job_id", j.id).order("created_at", { ascending: false })) : Promise.resolve([]));
  const poster = useData("profile:" + j.author, () => q(sb.from("profiles").select(PROFILE_COLS).eq("id", j.author).maybeSingle()));
  const [apply, setApply] = useState(false);
  const [msg, setMsg] = useState(""); const [cv, setCv] = useState(null); const [cvPrev, setCvPrev] = useState("");
  const [busy, setBusy] = useState(false);
  const applied = (apps.data || []).some(a => a.job_id === j.id);
  const send = async () => {
    setBusy(true);
    try {
      const cv_path = cv ? await uploadFile("cvs", cv, "cv") : "";
      await q(sb.from("applications").insert({ job_id: j.id, applicant: uid(), message: msg.trim(), cv_path }));
      UI.sheet = null; refresh(); toast("Candidature envoyée à " + j.company + ".");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  const openCv = async path => { try { window.open(await signedUrl("cvs", path), "_blank", "noopener"); } catch (e) { fail(e); } };
  return html`<${Sheet}>
    ${!apply ? html`<div class="col" style="gap:12px">
      <span class="row"><span class="logo-sq" style=${"width:54px;height:54px;background:" + coColor(j.company)}>${initials(j.company)}</span><span class="grow"><h2 style="font-size:19px;line-height:1.25">${j.title}</h2><span class="small muted">${j.company}</span></span></span>
      <div class="row" style="gap:6px;flex-wrap:wrap"><span class="pill pill-gold">${j.contract}</span><span class="pill pill-grey"><${Icon} n="pin" s=${13} />${j.place}</span><span class="pill pill-grey">${j.salary}</span></div>
      <p style="line-height:1.6;white-space:pre-wrap">${j.description}</p>
      ${poster.data && j.author !== uid() && html`<div class="row small muted"><${Avatar} p=${poster.data} size=${30} />Publiée par ${fullName(poster.data)} · ${ago(j.created_at)}</div>`}
      ${j.author === uid() ? html`
        <div class="demo-note">${j.status === "pending" ? "Votre offre est en attente : l'administrateur la vérifie avant publication." : j.status === "refused" ? "Cette offre n'a pas été validée par l'administrateur." : "Votre offre est en ligne."}</div>
        <b style="margin-top:4px">Candidatures reçues (${(received.data || []).length})</b>
        ${(received.data || []).map(a => html`<div key=${a.id} class="card col" style="gap:8px"><span class="row"><${Avatar} p=${a.a} size=${38} /><span class="grow"><b>${fullName(a.a)}</b><br /><span class="tiny muted">${jobLine(a.a)} · ${ago(a.created_at)}</span></span></span>${a.message && html`<p class="small" style="line-height:1.5;white-space:pre-wrap">${a.message}</p>`}
          <span class="row" style="gap:8px">${a.cv_path && html`<button class="btn btn-line btn-sm grow" onClick=${() => openCv(a.cv_path)}><${Icon} n="file" s=${16} />Voir le CV</button>`}<button class="btn btn-ink btn-sm grow" onClick=${() => { UI.sheet = null; openChat(a.applicant); }}>Écrire</button></span></div>`)}
        <button class="btn btn-danger btn-block" onClick=${() => openSheet("confirm", { title: "Supprimer cette offre ?", text: "L'offre et ses candidatures seront supprimées.", ok: "Supprimer", fn: async () => { await q(sb.from("jobs").delete().eq("id", j.id)); toast("Offre supprimée."); } })}>Supprimer l'offre</button>`
        : applied ? html`<button class="btn btn-ghost btn-block" disabled><${Icon} n="check" s=${18} />Candidature déjà envoyée</button>`
        : html`<button class="btn btn-gold btn-block" onClick=${() => setApply(true)}>Postuler</button>`}
    </div>` : html`<div class="col" style="gap:14px">
      <h2 style="font-size:19px">Postuler · ${j.company}</h2>
      <div class="row card"><${Avatar} p=${S.me} size=${42} /><span class="grow"><b>${fullName(S.me)}</b><br /><span class="small muted">Votre profil sera joint à la candidature</span></span></div>
      <${Field} label="Message de motivation"><textarea id="apply-msg" class="input" value=${msg} onInput=${e => setMsg(e.target.value)} placeholder="Présentez-vous en quelques lignes…"></textarea><//>
      <${Field} label="CV (photo ou capture)"><${Upload} id="apply-cv" icon="file" label="Joindre mon CV" sub="Facultatif · format image" preview=${cvPrev} max=${1800} onFile=${(b, u) => { setCv(b); setCvPrev(u); }} /><//>
      <${Busy} on=${busy} onClick=${send}>Envoyer ma candidature<//>
    </div>`}
  <//>`;
}

function JobForm() {
  const [f, setF] = useState({ title: "", company: (S.me && S.me.entreprise) || "", place: "", contract: "CDI", salary: "", description: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.company.trim() || !f.place.trim() || !f.description.trim()) { setErr("Renseignez le poste, l'entreprise, le lieu et la description."); return; }
    setBusy(true);
    try {
      await q(sb.from("jobs").insert({ author: uid(), title: f.title.trim(), company: f.company.trim(), place: f.place.trim(), contract: f.contract, salary: f.salary.trim() || "Selon profil", description: f.description.trim() }));
      UI.stack = []; UI.opp = "jobs"; UI.tab = "opps"; refresh(); toast(isAdmin() ? "Offre publiée." : "Offre envoyée. Elle sera publiée après validation.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay">
    <${OvHead} title="Publier une offre d'emploi" />
    <div class="ov-body col" style="gap:14px">
      <div class="demo-note" style="background:var(--gold-soft);color:#5B4612"><b>Validation obligatoire.</b> Chaque offre est vérifiée par l'administrateur avant d'être visible.</div>
      <${Field} label="Intitulé du poste" req><input id="jf-title" class="input" value=${f.title} onInput=${set("title")} placeholder="Assistant(e) commercial(e)" /><//>
      <${Field} label="Entreprise" req><input id="jf-company" class="input" value=${f.company} onInput=${set("company")} /><//>
      <${Field} label="Lieu" req><input id="jf-place" class="input" value=${f.place} onInput=${set("place")} placeholder="Abidjan, Cocody" /><//>
      <${Field} label="Type de contrat"><div class="chips" style="margin:0;padding:0;flex-wrap:wrap">${["CDI", "CDD", "Stage", "Freelance"].map(x => html`<button key=${x} class=${"chip" + (f.contract === x ? " on" : "")} onClick=${() => setF(Object.assign({}, f, { contract: x }))}>${x}</button>`)}</div><//>
      <${Field} label="Salaire"><input id="jf-salary" class="input" value=${f.salary} onInput=${set("salary")} placeholder="Selon profil" /><//>
      <${Field} label="Description du poste" req><textarea id="jf-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Missions, profil recherché, comment postuler…"></textarea><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Envoyer pour validation<//>
    </div>
  </div>`;
}

const SERV_SEL = "*, a:profiles!services_author_fkey(" + PROFILE_COLS + ")";
function Services() {
  const [qq, setQ] = useState("");
  const s = useData("services", () => q(sb.from("services").select(SERV_SEL).order("created_at", { ascending: false }).limit(200)));
  const list = (s.data || []).filter(x => !qq || [x.title, x.cat, fullName(x.a), x.description].join(" ").toLowerCase().includes(qq.toLowerCase()));
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Services entre membres</h2><span class="tiny muted">Des compétences de confiance</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("servForm")}><${Icon} n="plus" s=${17} w=${2.6} />Proposer</button></div>
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="serv-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Comptable, avocat, architecte…" /></div>
    ${s.loading && !s.data && html`<${Loading} />`}
    <div class="col" style="margin-top:12px">
      ${list.map(x => html`<div key=${x.id} class="card col" style="gap:10px">
        <span class="row"><${Avatar} p=${x.a} size=${42} /><span class="grow" style="min-width:0"><b>${fullName(x.a)}</b><${Verified} s=${14} /><br /><span class="tiny muted">${jobLine(x.a)}</span></span><span class="pill pill-gold">${x.cat}</span></span>
        <b style="font-size:15.5px;line-height:1.35">${x.title}</b>
        <p class="small muted" style="line-height:1.55;white-space:pre-wrap">${x.description}</p>
        <span class="row small" style="justify-content:space-between"><span class="row" style="gap:5px"><${Icon} n="pin" s=${15} c="#8E6A1C" />${x.zone}</span><b>${x.price}</b></span>
        ${x.author !== uid() ? html`<button class="btn btn-ink btn-sm btn-block" onClick=${() => openChat(x.author)}><${Icon} n="chat" s=${17} />Contacter</button>`
          : html`<button class="btn btn-danger btn-sm" onClick=${() => openSheet("confirm", { title: "Retirer ce service ?", text: "Il ne sera plus visible par les membres.", ok: "Retirer", fn: async () => { await q(sb.from("services").delete().eq("id", x.id)); } })}>Retirer mon service</button>`}
      </div>`)}
    </div>
    ${!s.loading && !list.length && html`<${Empty} icon="tool" title="Aucun service pour l'instant" text="Comptable, avocat, architecte, développeur… proposez vos compétences aux membres." />`}
  </div>`;
}

const DEAL_IMG = { Immobilier: "immo", "Véhicule": "voiture", "Matériel": "ordinateur", Partenariat: "outils" };
function Deals() {
  const [c, setC] = useState("Tout");
  const d = useData("deals", () => q(sb.from("deals").select("*, a:profiles!deals_author_fkey(" + PROFILE_COLS + ")").order("created_at", { ascending: false }).limit(200)));
  const list = (d.data || []).filter(x => c === "Tout" || x.cat === c);
  return html`<div>
    <div class="row" style="justify-content:space-between;margin:18px 0 10px"><span><h2 style="font-size:20px">Affaires</h2><span class="tiny muted">Biens, véhicules, matériel, partenariats</span></span><button class="btn btn-gold btn-sm" onClick=${() => push("dealForm")}><${Icon} n="plus" s=${17} w=${2.6} />Publier</button></div>
    <div class="chips">${["Tout", "Immobilier", "Véhicule", "Matériel", "Partenariat"].map(x => html`<button key=${x} class=${"chip" + (x === c ? " on" : "")} onClick=${() => setC(x)}>${x}</button>`)}</div>
    ${d.loading && !d.data && html`<${Loading} />`}
    <div class="pgrid" style="margin-top:10px">
      ${list.map(x => html`<div key=${x.id} class="card col" style="padding:8px;gap:8px">
        <span class="deal-img" style=${x.photo_url ? "padding:0" : ""}>${x.photo_url ? html`<img src=${x.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" />` : html`<img src=${IMG[DEAL_IMG[x.cat]] || IMG.immo} alt="" />`}</span>
        <span class="pill pill-grey" style="align-self:flex-start">${x.cat}</span>
        <b style="font-size:13.5px;line-height:1.3;padding:0 2px">${x.title}</b>
        <span class="tiny muted" style="padding:0 2px">${x.place} · ${fullName(x.a)}</span>
        <b style="font-family:var(--f-head);padding:0 2px">${x.price}</b>
        ${x.author !== uid() ? html`<button class="btn btn-ghost btn-sm" onClick=${() => openChat(x.author)}>Contacter</button>`
          : html`<button class="btn btn-danger btn-sm" onClick=${() => openSheet("confirm", { title: "Retirer cette annonce ?", text: "Elle ne sera plus visible.", ok: "Retirer", fn: async () => { await q(sb.from("deals").delete().eq("id", x.id)); } })}>Retirer</button>`}
      </div>`)}
    </div>
    ${!d.loading && !list.length && html`<${Empty} icon="brief" title="Aucune affaire dans cette catégorie" text="Terrain, véhicule, matériel ou partenariat : publiez la première annonce." />`}
  </div>`;
}

function ServForm() {
  const [f, setF] = useState({ cat: "", title: "", description: "", zone: "", price: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.cat.trim() || !f.description.trim()) { setErr("Renseignez le domaine, le titre et la description."); return; }
    setBusy(true);
    try { await q(sb.from("services").insert({ author: uid(), cat: f.cat.trim(), title: f.title.trim(), description: f.description.trim(), zone: f.zone.trim() || "À préciser", price: f.price.trim() || "Sur devis" })); UI.stack = []; UI.opp = "services"; UI.tab = "opps"; refresh(); toast("Votre service est en ligne."); }
    catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Proposer un service" />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Domaine" req><input id="sf-cat" class="input" value=${f.cat} onInput=${set("cat")} placeholder="Comptabilité, Juridique, BTP…" /><//>
      <${Field} label="Titre du service" req><input id="sf-title" class="input" value=${f.title} onInput=${set("title")} /><//>
      <${Field} label="Description" req><textarea id="sf-desc" class="input" value=${f.description} onInput=${set("description")}></textarea><//>
      <${Field} label="Zone d'intervention"><input id="sf-zone" class="input" value=${f.zone} onInput=${set("zone")} placeholder="Abidjan et à distance" /><//>
      <${Field} label="Tarif"><input id="sf-price" class="input" value=${f.price} onInput=${set("price")} placeholder="Sur devis" /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Publier mon service<//>
    </div></div>`;
}
function DealForm() {
  const [f, setF] = useState({ cat: "Immobilier", title: "", price: "", place: "" });
  const [photo, setPhoto] = useState(null); const [prev, setPrev] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.title.trim() || !f.place.trim()) { setErr("Renseignez le titre et le lieu."); return; }
    setBusy(true);
    try {
      const photo_url = photo ? publicUrl("deals", await uploadFile("deals", photo, "affaire")) : "";
      await q(sb.from("deals").insert({ author: uid(), cat: f.cat, title: f.title.trim(), price: f.price.trim() || "Prix à débattre", place: f.place.trim(), photo_url }));
      UI.stack = []; UI.opp = "deals"; UI.tab = "opps"; refresh(); toast("Votre annonce est en ligne.");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Publier une affaire" />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Catégorie"><div class="chips" style="margin:0;padding:0;flex-wrap:wrap">${["Immobilier", "Véhicule", "Matériel", "Partenariat"].map(x => html`<button key=${x} class=${"chip" + (f.cat === x ? " on" : "")} onClick=${() => setF(Object.assign({}, f, { cat: x }))}>${x}</button>`)}</div><//>
      <${Field} label="Titre" req><input id="df-title" class="input" value=${f.title} onInput=${set("title")} placeholder="Terrain 600 m² avec ACD" /><//>
      <${Field} label="Prix"><input id="df-price" class="input" value=${f.price} onInput=${set("price")} placeholder="Prix à débattre" /><//>
      <${Field} label="Lieu" req><input id="df-place" class="input" value=${f.place} onInput=${set("place")} placeholder="Bingerville" /><//>
      <${Field} label="Photo"><${Upload} id="df-photo" icon="photo" label="Ajouter une photo" sub="Facultatif" preview=${prev} onFile=${(b, u) => { setPhoto(b); setPrev(u); }} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${submit}>Publier l'annonce<//>
    </div></div>`;
}

/* ===== Joyau : la marketplace intégrée ===== */
const HERO = [
  { tag: "NOUVEAU", title: "Achetez aux membres, en un message.", text: "Choisissez, puis commandez directement sur WhatsApp", img: "sac", bg: "#0B1B3F", fg: "#fff", sub: "#C7D4F0", d1: "#1D4ED8", d2: "#3B82F6", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#fff", goFg: "#0B1B3F", go: "Voir les annonces", act: { cat: "Tout" } },
  { tag: "MODE", title: "Wax, sacs et baskets.", text: "Les créateurs de la communauté", img: "robe", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#0B1B3F", goFg: "#fff", go: "Découvrir", act: { cat: "Mode" } },
  { tag: "BIJOUX & MONTRES", title: "Des cadeaux qui brillent.", text: "Colliers, montres et parures", img: "collier", bg: "#EAF1FF", fg: "#0B1B3F", sub: "#33405C", d1: "#DBE6FF", d2: "#1D4ED8", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#1D4ED8", goFg: "#fff", go: "Voir", act: { cat: "Bijoux & Montres" } }
];
const ADS1 = [
  { tag: "SAVEURS D'ICI", title: "Le goût du pays, commandé en un message.", text: "Attiéké, bissap, gâteaux maison", img: "attieke", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#FFC93C", goFg: "#0B1B3F", go: "Commander", act: { cat: "Gastronomie" } },
  { tag: "IMMOBILIER", title: "Votre prochain chez-vous est sur Joyau.", text: "Terrains, maisons, magasins, hôtels et résidences", img: "immo", bg: "#0B1B3F", fg: "#fff", sub: "#C7D4F0", d1: "#1D4ED8", d2: "#3B82F6", tagBg: "#1D4ED8", tagFg: "#fff", goBg: "#fff", goFg: "#0B1B3F", go: "Voir les biens", act: { cat: "Immobilier" } },
  { tag: "PRESTATIONS DE SERVICES", title: "Un artisan de confiance, en un message.", text: "Menuisiers, plombiers, ferronniers, faniko…", img: "menuiserie", bg: "#FFC93C", fg: "#0B1B3F", sub: "#4A3A10", d1: "#FFD96B", d2: "#D62839", tagBg: "#D62839", tagFg: "#fff", goBg: "#0B1B3F", goFg: "#fff", go: "Trouver un pro", act: { cat: "Services" } }
];
const ADS2 = [
  { tag: "HIGH-TECH", title: "Le bon smartphone, au juste prix.", text: "Téléphones et accessoires des vendeurs membres", img: "telephone", bg: "#1D4ED8", fg: "#fff", sub: "#DCE7FF", d1: "#2563EB", d2: "#60A5FA", tagBg: "#FFC93C", tagFg: "#0B1B3F", goBg: "#fff", goFg: "#1D4ED8", go: "Voir les offres", act: { cat: "Téléphones" } },
  { tag: "BEAUTÉ", title: "Prenez soin de vous.", text: "Parfums, soins et cosmétiques", img: "parfum", bg: "#D62839", fg: "#fff", sub: "#FFE4E7", d1: "#E8475A", d2: "#FFC93C", tagBg: "#fff", tagFg: "#D62839", goBg: "#0B1B3F", goFg: "#fff", go: "Je découvre", act: { cat: "Beauté" } },
  { tag: "VOTRE PUB ICI", title: "Votre boutique mérite cette place.", text: "Gratuit pour les membres, sans commission", img: "blender", bg: "#FFC93C", fg: "#0B1B3F", sub: "#4A3A10", d1: "#FFD96B", d2: "#1D4ED8", tagBg: "#0B1B3F", tagFg: "#fff", goBg: "#1D4ED8", goFg: "#fff", go: "Ouvrir ma boutique", act: { shop: true } }
];
const PROD_SEL = "*, shops(id,name,city,whatsapp,owner)";
const fetchProducts = () => q(sb.from("products").select(PROD_SEL).eq("status", "online").order("created_at", { ascending: false }).limit(300));

function runAct(a) {
  if (a.shop) openShop();
  else if (a.cat) { UI.jcat = a.cat; rerender(); setTimeout(() => { const el = document.getElementById("j-annonces"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 40); }
}
function openShop() { if (!isMember()) { openSheet("join", { what: "La vente sur Joyau" }); return; } push("shop"); }

function Slider({ slides, sponso }) {
  const [i, setI] = useState(0);
  const [dx, setDx] = useState(0);
  const [tick, setTick] = useState(0);
  const drag = useRef(null);
  const moved = useRef(false);
  const n = slides.length;
  // Défilement automatique toutes les 3 secondes (le minuteur repart après chaque changement ou glissement)
  useEffect(() => {
    const t = setTimeout(() => { if (drag.current) setTick(x => x + 1); else setI(x => (x + 1) % n); }, 3000);
    return () => clearTimeout(t);
  }, [i, tick]);
  // Glisser du doigt (ou de la souris) pour changer de diapositive
  const down = e => { if (e.pointerType === "mouse" && e.button !== 0) return; drag.current = { x: e.clientX, y: e.clientY, w: e.currentTarget.offsetWidth, axis: null }; moved.current = false; };
  const move = e => {
    const d = drag.current; if (!d) return;
    const mx = e.clientX - d.x, my = e.clientY - d.y;
    if (!d.axis && (Math.abs(mx) > 6 || Math.abs(my) > 6)) { d.axis = Math.abs(mx) > Math.abs(my) ? "x" : "y"; if (d.axis === "x") { moved.current = true; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {} } }
    if (d.axis === "x") { const edge = (i === 0 && mx > 0) || (i === n - 1 && mx < 0); setDx(edge ? mx * 0.35 : mx); }
  };
  const up = () => {
    const d = drag.current; drag.current = null; if (!d) return;
    if (d.axis === "x") { const lim = Math.min(80, d.w * 0.18); if (dx < -lim) setI(x => Math.min(n - 1, x + 1)); else if (dx > lim) setI(x => Math.max(0, x - 1)); else setTick(x => x + 1); }
    setDx(0);
  };
  const dark = slides[i].fg !== "#fff";
  const dragging = dx !== 0;
  return html`<div class="slider" style="touch-action:pan-y;user-select:none;-webkit-user-select:none" onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerCancel=${up} onPointerLeave=${e => { if (drag.current && e.pointerType === "mouse") up(); }} onClickCapture=${e => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }} onDragStart=${e => e.preventDefault()}>
    <div class="track" style=${"transform:translateX(calc(-" + i * 100 + "% + " + dx + "px))" + (dragging ? ";transition:none" : "")}>
      ${slides.map((x, k) => html`<div key=${k} class="slide" style=${"background:" + x.bg + ";color:" + x.fg} aria-hidden=${k !== i}>
        <span class="deco1" style=${"background:" + x.d1}></span><span class="deco2" style=${"border:2px solid " + x.d2}></span>
        <div class="txt"><span class="tag" style=${"background:" + x.tagBg + ";color:" + x.tagFg}>${x.tag}</span><h3>${x.title}</h3><span style=${"font-size:13px;line-height:1.4;color:" + x.sub}>${x.text}</span>
          <button class="go" tabindex=${k === i ? 0 : -1} style=${"background:" + x.goBg + ";color:" + x.goFg} onClick=${() => runAct(x.act)}>${x.go} →</button></div>
        <div class="art"><span class="tile" style=${"transform:rotate(" + (k % 2 ? 5 : -6) + "deg)"}><img src=${IMG[x.img]} alt="" /></span></div>
      </div>`)}
    </div>
    ${sponso && html`<span class="sponso">SPONSORISÉ</span>`}
    <div class="dots">${slides.map((x, k) => html`<button key=${k} aria-label=${"Diapositive " + (k + 1)} class=${k === i ? "on" : ""} style=${"background:" + (dark ? (k === i ? "#0B1B3F" : "rgba(11,27,63,.3)") : (k === i ? "#fff" : "rgba(255,255,255,.5)"))} onClick=${() => setI(k)}></button>`)}</div>
  </div>`;
}

function ProductCard({ p }) {
  const fav = getFavs().includes(p.id);
  const shop = p.shops || {};
  return html`<div style="position:relative">
    <button class="pcard" style="width:100%" onClick=${() => push("product", { id: p.id })}>
      <span class="ph"><img class="photo" src=${p.photo_url} alt=${p.name} loading="lazy" /><span class="cat">${p.cat === "Services" ? "Service" : p.cat}</span></span>
      <span class="nm">${p.name}</span><span class="sl">${shop.name || ""}${shop.city ? " · " + shop.city : ""}</span><span class="pr">${fmt(p.price)}</span>
    </button>
    <button class="fav" aria-label=${fav ? "Retirer des favoris" : "Ajouter aux favoris"} aria-pressed=${fav} onClick=${() => toggleFav(p.id)}><${Icon} n="heart" s=${17} c=${fav ? "#D62839" : "#0B1B3F"} fill=${fav ? "#D62839" : "none"} /></button>
  </div>`;
}

async function installJoyau() {
  if (typeof INSTALL_EVT !== "undefined" && INSTALL_EVT) { INSTALL_EVT.prompt(); try { await INSTALL_EVT.userChoice; } catch (e) {} INSTALL_EVT = null; rerender(); return; }
  openSheet("installJoyau");
}
function InstallJoyauSheet() {
  const ios = isIOS();
  return html`<${Sheet}><div class="col j-scope" style="gap:14px">
    <span class="row"><span class="j-logo"><span class="sq" style="width:54px;height:54px;border-radius:16px"><${Bag} s=${38} /></span></span><span><h2 style="font-size:19px">Installer Joyau</h2><span class="small" style="color:var(--j-muted)">Une icône sur votre écran d'accueil, comme une application.</span></span></span>
    ${ios ? html`<div class="col" style="gap:10px;line-height:1.5"><span>1. Dans <b>Safari</b>, touchez <b>Partager</b> (le carré avec une flèche vers le haut).</span><span>2. Choisissez <b>Sur l'écran d'accueil</b>.</span><span>3. Touchez <b>Ajouter</b> : l'icône Joyau apparaît.</span></div>`
      : html`<div class="col" style="gap:10px;line-height:1.5"><span>1. Ouvrez le menu <b>⋮</b> de Chrome, en haut à droite.</span><span>2. Touchez <b>Installer l'application</b> ou <b>Ajouter à l'écran d'accueil</b>.</span><span>3. Confirmez : l'icône Joyau apparaît.</span></div>`}
    <button class="btn btn-j btn-block" onClick=${closeSheet}>J'ai compris</button>
  </div><//>`;
}
function JoyauTop({ hasShop }) {
  const n = getFavs().length;
  return html`<div class="j-top">
    <div class="row">
      ${!JOYAU_MODE && isMember() && html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Retour à Force Chrétienne" onClick=${() => go("home")}><${Shield} s=${26} /></button>`}
      <span class="grow"><${JoyauLogo} slogan=${JOYAU_MODE || !isMember()} /></span>
      ${JOYAU_MODE && !isStandalone() && html`<button class="icon-btn" style="background:#FFF7DD" aria-label="Installer Joyau sur l'écran d'accueil" onClick=${installJoyau}><${Icon} n="download" s=${20} c="#1F3FC4" /></button>`}
      <button class="icon-btn" style="background:var(--j-soft)" aria-label=${"Mes favoris" + (n ? ", " + n : "")} onClick=${() => push("favs")}><${Icon} n="heart" s=${20} c="#0B1B3F" />${n ? html`<span class="badge">${n}</span>` : ""}</button>
      <button class="btn btn-sm" style="background:#D62839;color:#fff;padding:0 12px" onClick=${openShop}><${Icon} n="store" s=${17} />${hasShop ? "Ma boutique" : "Vendre"}</button>
    </div>
    <div class="search"><${Icon} n="search" s=${19} c="#55607A" /><input id="j-q" class="input" style="background:var(--j-soft)" value=${UI.jq || ""} onInput=${e => { UI.jq = e.target.value; rerender(); }} placeholder="Rechercher un produit, un service, un bien…" /></div>
  </div>`;
}

function JoyauTab() {
  const cat = UI.jcat || "Tout";
  const qq = (UI.jq || "").toLowerCase().trim();
  const prods = useData("products", fetchProducts);
  const myShop = useData("my-shop", () => uid() ? q(sb.from("shops").select("*").eq("owner", uid()).maybeSingle()) : Promise.resolve(null));
  const online = prods.data || [];
  const list = online.filter(p => (cat === "Tout" || p.cat === cat) && (!qq || [p.name, p.cat, p.description, p.shops && p.shops.name, p.shops && p.shops.city].join(" ").toLowerCase().includes(qq)));
  const setCat = c => { UI.jcat = c; rerender(); };
  const searching = qq || cat !== "Tout";
  const shopsMap = {};
  online.forEach(p => { if (p.shops) { const s = shopsMap[p.shops.id] || (shopsMap[p.shops.id] = { shop: p.shops, items: [] }); if (s.items.length < 2) s.items.push(p); } });
  const shops = Object.values(shopsMap).slice(0, 10);
  const catIcon = c => c === "Immobilier" ? html`<${Icon} n="building" s=${16} />` : c === "Services" ? html`<${Icon} n="tool" s=${16} />` : "";
  return html`<div class="j-scope" style="padding-bottom:120px">
    <${JoyauTop} hasShop=${!!myShop.data} />
    <div style="padding:12px 16px 0">
      <div class="chips">${CATS.map(c => html`<button key=${c} class=${"chip" + (c === cat ? " on" : "")} onClick=${() => setCat(c)}>${catIcon(c)}${c === "Services" ? "Prestations de services" : c}</button>`)}</div>
      ${!searching && html`
        <${Slider} slides=${HERO} />
        ${!S.session && html`<div class="row" style="margin-top:12px;padding:12px 14px;border-radius:16px;background:#FFF7DD"><${Shield} s=${30} /><span class="grow small" style="line-height:1.45"><b>Vous êtes membre d'une église ?</b> Rejoignez Force Chrétienne pour vendre et réseauter.</span><button class="btn btn-sm" style="background:#0B1B3F;color:#fff" onClick=${() => { if (JOYAU_MODE) { goFC("signup"); return; } S.guest = false; UI.start = "signup"; rerender(); }}>Rejoindre</button></div>`}
        <div class="section-title"><h2>Explorer les univers</h2></div>
        <div class="bento">
          <button style="background:#D62839;color:#fff" onClick=${() => setCat("Gastronomie")}><strong>Gastronomie</strong><span class="s">Plats, jus, pâtisseries</span><img src=${IMG.attieke} alt="" /></button>
          <button style="background:#0B1B3F;color:#fff" onClick=${() => setCat("Immobilier")}><strong>Immobilier</strong><span class="s">Terrains, maisons, hôtels et résidences</span><img src=${IMG.hotel} alt="" /></button>
          <button style="background:#FFC93C;color:#0B1B3F" onClick=${() => setCat("Services")}><strong>Prestations de services</strong><span class="s">Menuiserie, plomberie, faniko…</span><img src=${IMG.outils} alt="" /></button>
          <button style="background:#EAF1FF;color:#0B1B3F" onClick=${() => setCat("Mode")}><strong>Mode</strong><span class="s">Wax, sacs, baskets</span><img src=${IMG.robe} alt="" /></button>
        </div>
        <div style="margin-top:22px"><${Slider} slides=${ADS1} sponso /></div>`}
      <div id="j-annonces" class="section-title" style="scroll-margin-top:130px"><h2>${searching ? (cat !== "Tout" ? (cat === "Services" ? "Prestations de services" : cat) : "Résultats") : "Dernières annonces"}</h2><span class="small" style="color:var(--j-muted)">${list.length} annonce${list.length > 1 ? "s" : ""}</span></div>
      ${searching && html`<button class="link" style="margin:-6px 0 12px" onClick=${() => { UI.jcat = "Tout"; UI.jq = ""; rerender(); }}>← Revenir à l'accueil Joyau</button>`}
      ${prods.loading && !prods.data && html`<${Loading} />`}
      <div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>
      ${!prods.loading && !list.length && html`<${Empty} icon="store" title=${online.length ? "Aucune annonce trouvée" : "Les premières boutiques ouvrent bientôt"} text=${online.length ? "Essayez un autre mot ou une autre catégorie." : "Membre de Force Chrétienne ? Ouvrez votre boutique gratuitement et soyez parmi les premiers vendeurs."}>${!online.length && html`<button class="btn btn-j btn-sm" onClick=${openShop}>Ouvrir ma boutique</button>`}<//>`}
      ${!searching && html`
        <div style="margin-top:26px"><${Slider} slides=${ADS2} sponso /></div>
        <div class="section-title"><h2>Acheter en 3 gestes</h2></div>
        <div class="steps">
          <div class="step" style="border-left:4px solid #D62839"><b class="n" style="color:#D62839">01</b><span><b>Trouvez</b><br /><span class="small" style="color:var(--j-muted)">Cherchez ou parcourez les univers, de la mode à la gastronomie.</span></span></div>
          <div class="step" style="border-left:4px solid #FFC93C"><b class="n" style="color:#C99A12">02</b><span><b>Choisissez</b><br /><span class="small" style="color:var(--j-muted)">Couleur, taille, quantité : votre commande est précise.</span></span></div>
          <div class="step" style="border-left:4px solid #1D4ED8"><b class="n" style="color:#1D4ED8">03</b><span><b>Commandez sur WhatsApp</b><br /><span class="small" style="color:var(--j-muted)">Le message part tout prêt chez le vendeur. Paiement et livraison se règlent avec lui.</span></span></div>
        </div>
        ${shops.length > 0 && html`<div class="section-title"><h2>Boutiques</h2></div>
        <div class="hscroll">${shops.map((s, k) => html`<button key=${s.shop.id} class="card col" style="width:210px;flex:none;text-align:left;background:var(--j-soft);border:0;gap:10px" onClick=${() => push("seller", { id: s.shop.id })}>
          <span class="row"><span class="logo-sq" style=${"width:42px;height:42px;background:" + ["#1D4ED8", "#D62839", "#0B1B3F", "#1F3FC4", "#2563EB"][k % 5]}>${initials(s.shop.name)}</span><span class="grow" style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.shop.name}</b><span class="tiny" style="color:var(--j-muted)">${s.shop.city}</span></span></span>
          <span class="row" style="gap:6px">${s.items.map(it => html`<span key=${it.id} style="flex:1;height:64px;border-radius:12px;background:#fff;overflow:hidden"><img src=${it.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span>`)}</span>
        </button>`)}</div>`}
        <div style="margin-top:26px;background:#1D4ED8;color:#fff;border-radius:24px;padding:24px 20px;position:relative;overflow:hidden" class="col">
          <span style="position:absolute;right:-60px;top:-90px;width:220px;height:220px;border-radius:999px;border:36px solid #2563EB"></span>
          <h2 style="position:relative;font-size:25px;line-height:1.05">Vous vendez ?<br />Joyau vous amène les clients.</h2>
          <p style="position:relative;color:#DCE7FF;font-size:14px;line-height:1.5">Boutique gratuite pour les membres de Force Chrétienne. Les commandes arrivent sur votre WhatsApp.</p>
          <button class="btn btn-jy" style="position:relative;align-self:flex-start" onClick=${openShop}>${myShop.data ? "Gérer ma boutique" : "Créer ma boutique"}</button>
        </div>`}
      ${JOYAU_MODE && html`<a href="/" class="row" style="margin-top:22px;padding:14px;border-radius:18px;background:var(--soft);text-decoration:none;color:var(--ink)"><${Shield} s=${34} /><span class="grow small" style="line-height:1.45">Joyau est la boutique de <b>Force Chrétienne</b>, le réseau des professionnels chrétiens.</span><${Icon} n="arrow" s=${18} /></a>`}
    </div>
  </div>`;
}

function Product({ id }) {
  const pr = useData("product:" + id, () => q(sb.from("products").select(PROD_SEL).eq("id", id).maybeSingle()));
  const all = useData("products", fetchProducts);
  const [o, setO] = useState(0); const [s, setS] = useState(0); const [n, setN] = useState(1);
  useEffect(() => { sb.rpc("product_view", { p_id: id }).then(() => {}, () => {}); }, [id]);
  const p = pr.data;
  if (pr.loading && !p) return html`<div class="overlay j-scope"><${OvHead} title="Joyau" /><${Loading} /></div>`;
  if (!p) return html`<div class="overlay j-scope"><${OvHead} title="Joyau" /><${Empty} icon="store" title="Cette annonce n'est plus disponible" /></div>`;
  const shop = p.shops || {};
  const fav = getFavs().includes(p.id);
  const opts = p.opts || [], sizes = p.sizes || [];
  const others = (all.data || []).filter(x => x.shop_id === p.shop_id && x.id !== p.id).slice(0, 4);
  const lines = ["Bonjour " + shop.name + ", je souhaite commander via Joyau :", "", "• Produit : " + p.name];
  if (opts.length) lines.push("• " + (p.opt_label || "Option") + " : " + opts[o]);
  if (sizes.length) lines.push("• " + (p.size_label || "Taille") + " : " + sizes[s]);
  lines.push("• Quantité : " + n, "• Prix unitaire : " + fmt(p.price), "• Total : " + fmt(p.price * n), "", "Merci de me confirmer la disponibilité, le paiement et la livraison.");
  const msg = lines.join("\n");
  return html`<div class="overlay j-scope">
    <${OvHead} title=${shop.name || "Joyau"} right=${html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Partager ce produit" onClick=${() => shareLink(p.name, p.name + " à " + fmt(p.price) + " sur Joyau", location.origin + "/joyau?p=" + p.id)}><${Icon} n="share" s=${19} c="#0B1B3F" /></button><button class="icon-btn" style="background:var(--j-soft)" aria-label=${fav ? "Retirer des favoris" : "Ajouter aux favoris"} onClick=${() => toggleFav(p.id)}><${Icon} n="heart" s=${20} c=${fav ? "#D62839" : "#0B1B3F"} fill=${fav ? "#D62839" : "none"} /></button>`} />
    <div style="aspect-ratio:1/1;max-height:420px;width:100%;background:var(--j-soft);overflow:hidden"><img src=${p.photo_url} alt=${p.name} style="width:100%;height:100%;object-fit:cover;display:block" /></div>
    <div class="ov-body col" style="gap:16px">
      ${p.status !== "online" && html`<div class="demo-note" style="background:var(--warn-soft);color:var(--warn)">${p.status === "hidden_admin" ? "Annonce masquée par l'administrateur." : "Annonce masquée : seuls vous la voyez."}</div>`}
      <div class="col" style="gap:6px"><span class="pill pill-j" style="align-self:flex-start">${p.cat === "Services" ? "Prestation de service" : p.cat}</span><h1 style="font-size:23px;line-height:1.15">${p.name}</h1><b style="font-family:var(--f-head);font-size:26px">${fmt(p.price)}</b></div>
      <button class="card row" style="text-align:left;border-color:var(--j-line)" onClick=${() => push("seller", { id: p.shop_id })}><span class="logo-sq" style="background:#1D4ED8">${initials(shop.name)}</span><span class="grow"><b>${shop.name}</b><${Verified} s=${14} /><br /><span class="small" style="color:var(--j-muted)">Membre Force Chrétienne · ${shop.city}</span></span><${Icon} n="arrow" s=${18} /></button>
      ${p.description && html`<p style="line-height:1.6;color:#33405C;white-space:pre-wrap">${p.description}</p>`}
      ${opts.length > 0 && html`<div class="col" style="gap:8px"><b>${p.opt_label || "Option"} : <span style="font-weight:500">${opts[o]}</span></b><div class="row" style="flex-wrap:wrap;gap:8px">${opts.map((x, k) => html`<button key=${x} class=${"opt" + (k === o ? " on" : "")} onClick=${() => setO(k)}>${x}</button>`)}</div></div>`}
      ${sizes.length > 0 && html`<div class="col" style="gap:8px"><b>${p.size_label || "Taille"} : <span style="font-weight:500">${sizes[s]}</span></b><div class="row" style="flex-wrap:wrap;gap:8px">${sizes.map((x, k) => html`<button key=${x} class=${"opt" + (k === s ? " on" : "")} onClick=${() => setS(k)}>${x}</button>`)}</div></div>`}
      <div class="row" style="justify-content:space-between"><div class="qty"><button aria-label="Diminuer la quantité" onClick=${() => setN(Math.max(1, n - 1))}>−</button><span>${n}</span><button aria-label="Augmenter la quantité" onClick=${() => setN(n + 1)}>+</button></div><span style="text-align:right"><span class="small" style="color:var(--j-muted)">Total</span><br /><b style="font-family:var(--f-head);font-size:24px">${fmt(p.price * n)}</b></span></div>
      <button class="btn btn-j btn-block" style="height:58px;font-size:17px" onClick=${() => { sb.rpc("product_click", { p_id: p.id }).then(() => {}, () => {}); openSheet("wa", { msg, num: waNumber(shop.whatsapp), seller: shop.name }); }}><${Icon} n="wa" s=${22} />Commander sur WhatsApp</button>
      <p class="center small" style="color:var(--j-muted);margin-top:-8px">Paiement et livraison à convenir directement avec le vendeur.</p>
      <button class="btn btn-line btn-block" style="border-color:var(--j-line);color:#1D4ED8" onClick=${() => shareLink(p.name, p.name + " à " + fmt(p.price) + " sur Joyau", location.origin + "/joyau?p=" + p.id)}><${Icon} n="share" s=${18} />Partager ce produit</button>
      ${others.length > 0 && html`<div><div class="section-title" style="margin-top:8px"><h2 style="font-size:18px">Du même vendeur</h2></div><div class="pgrid">${others.map(x => html`<${ProductCard} key=${x.id} p=${x} />`)}</div></div>`}
    </div>
  </div>`;
}
function WaSheet({ msg, num, seller }) {
  const url = "https://wa.me/" + (num || "") + "?text=" + encodeURIComponent(msg);
  return html`<${Sheet}><div class="col j-scope" style="gap:14px">
    <h2 style="font-size:19px">Votre commande est prête</h2>
    <div class="wa-preview"><div class="h"><span class="av" style="width:36px;height:36px;background:#fff;color:#075E54;font-size:13px">${initials(seller)}</span><b>${seller}</b></div><div class="b"><div class="bubble">${msg}</div></div></div>
    <a class="btn btn-wa btn-block" style="height:54px" href=${url} target="_blank" rel="noopener" onClick=${() => setTimeout(closeSheet, 300)}><${Icon} n="wa" s=${22} />Ouvrir WhatsApp et envoyer</a>
    <button class="btn btn-ghost btn-block" onClick=${closeSheet}>Modifier ma commande</button>
  </div><//>`;
}

function Seller({ id }) {
  const shop = useData("shop:" + id, () => q(sb.from("shops").select("*").eq("id", id).maybeSingle()));
  const prods = useData("shop-products:" + id, () => q(sb.from("products").select(PROD_SEL).eq("shop_id", id).eq("status", "online").order("created_at", { ascending: false })));
  const s = shop.data || {};
  const list = prods.data || [];
  return html`<div class="overlay j-scope"><${OvHead} title=${s.name || "Boutique"} right=${s.id && html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Partager la boutique" onClick=${() => shareLink(s.name, "La boutique " + s.name + " sur Joyau", location.origin + "/joyau?s=" + s.id)}><${Icon} n="share" s=${19} c="#0B1B3F" /></button>`} />
    <div style="background:#1D4ED8;color:#fff;padding:22px 16px;position:relative;overflow:hidden" class="row">
      <span style="position:absolute;right:-50px;top:-70px;width:180px;height:180px;border-radius:999px;border:30px solid #2563EB"></span>
      <span class="logo-sq" style="position:relative;width:64px;height:64px;font-size:22px;background:#FFC93C;color:#0B1B3F">${initials(s.name)}</span>
      <span class="grow" style="position:relative"><h1 style="font-size:22px">${s.name || "…"}</h1><span class="small" style="color:#DCE7FF">${s.city || ""} · ${list.length} annonce${list.length > 1 ? "s" : ""}</span></span>
    </div>
    <div class="ov-body">
      ${s.description && html`<p style="line-height:1.6;color:#33405C;margin-bottom:16px">${s.description}</p>`}
      ${s.owner && isMember() && s.owner !== uid() && html`<button class="btn btn-line btn-block" style="margin-bottom:16px" onClick=${() => push("profile", { id: s.owner })}>Voir le profil du vendeur</button>`}
      <div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>
      ${!prods.loading && !list.length && html`<${Empty} icon="store" title="Aucune annonce en ligne" />`}
    </div>
  </div>`;
}
function Favs() {
  const ids = getFavs();
  const prods = useData("favs:" + ids.join(","), () => ids.length ? q(sb.from("products").select(PROD_SEL).in("id", ids)) : Promise.resolve([]));
  const list = prods.data || [];
  return html`<div class="overlay j-scope"><${OvHead} title="Mes favoris" /><div class="ov-body"><div class="pgrid">${list.map(p => html`<${ProductCard} key=${p.id} p=${p} />`)}</div>${!prods.loading && !list.length && html`<${Empty} icon="heart" title="Aucun favori pour l'instant" text="Touchez le cœur d'une annonce pour la retrouver ici." />`}</div></div>`;
}

/* ===== Espace vendeur ===== */
function Shop() {
  const shop = useData("my-shop", () => q(sb.from("shops").select("*").eq("owner", uid()).maybeSingle()));
  const mine = useData("my-products", () => q(sb.from("products").select("*").eq("owner", uid()).order("created_at", { ascending: false })));
  if (shop.loading && shop.data === null && !("my-shop" in CACHE)) return html`<div class="overlay j-scope"><${OvHead} title="Ma boutique Joyau" /><${Loading} /></div>`;
  if (!shop.data) return html`<${ShopForm} />`;
  const s = shop.data, list = mine.data || [];
  const views = list.reduce((a, p) => a + (p.views || 0), 0), clicks = list.reduce((a, p) => a + (p.clicks || 0), 0);
  const toggle = async p => { try { await q(sb.from("products").update({ status: p.status === "online" ? "hidden" : "online" }).eq("id", p.id)); refresh(); } catch (e) { fail(e); } };
  return html`<div class="overlay j-scope">
    <${OvHead} title="Ma boutique Joyau" right=${html`<button class="icon-btn" style="background:var(--j-soft)" aria-label="Modifier la boutique" onClick=${() => push("shopEdit")}><${Icon} n="edit" s=${19} /></button>`} />
    <div style="background:#FFC93C;padding:18px 16px" class="row"><span class="logo-sq" style="width:58px;height:58px;background:#1D4ED8;font-size:20px">${initials(s.name)}</span><span class="grow"><h2 style="font-size:21px">${s.name}</h2><span class="small" style="color:#4A3A10">${s.city} · WhatsApp ${s.whatsapp}</span></span></div>
    <div class="ov-body col" style="gap:16px">
      <div class="row" style="gap:8px"><div class="stat"><b>${list.filter(p => p.status === "online").length}</b><span>en ligne</span></div><div class="stat"><b>${views}</b><span>vues</span></div><div class="stat"><b>${clicks}</b><span>commandes WhatsApp</span></div></div>
      <button class="btn btn-j btn-block" onClick=${() => push("productForm", { shop: s })}><${Icon} n="plus" s=${19} w=${2.6} />Ajouter un produit ou un service</button>
      <button class="btn btn-line btn-block" onClick=${() => push("seller", { id: s.id })}><${Icon} n="eye" s=${18} />Voir ma boutique comme un acheteur</button>
      <button class="btn btn-line btn-block" onClick=${() => shareLink(s.name, "Découvrez ma boutique " + s.name + " sur Joyau", location.origin + "/joyau?s=" + s.id)}><${Icon} n="share" s=${18} />Partager le lien de ma boutique</button>
      <div class="section-title" style="margin:6px 0 0"><h2 style="font-size:18px">Mes annonces</h2></div>
      ${list.map(p => html`<div key=${p.id} class="card row" style="border-color:var(--j-line);align-items:flex-start">
        <span style="width:68px;height:68px;border-radius:14px;background:var(--j-soft);flex:none;overflow:hidden"><img src=${p.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span>
        <span class="grow col" style="gap:4px;min-width:0"><b style="font-size:14.5px;line-height:1.3">${p.name}</b><span class="small" style="color:var(--j-muted)">${fmt(p.price)} · ${p.views} vues · ${p.clicks} commandes</span>
          <span class="row" style="gap:8px;margin-top:4px;flex-wrap:wrap"><span class=${"pill " + (p.status === "online" ? "pill-ok" : "pill-grey")}>${p.status === "online" ? "En ligne" : p.status === "hidden_admin" ? "Masqué par l'admin" : "Masqué"}</span>
            ${p.status !== "hidden_admin" && html`<button class="link" style="font-size:13px" onClick=${() => toggle(p)}>${p.status === "online" ? "Masquer" : "Remettre en ligne"}</button>`}
            <button class="link" style="font-size:13px" onClick=${() => push("productForm", { shop: s, edit: p })}>Modifier</button>
            <button class="link" style="font-size:13px;color:#B91C1C" onClick=${() => openSheet("confirm", { title: "Supprimer cette annonce ?", text: "« " + p.name + " » sera retirée de Joyau. Cette action est définitive.", ok: "Supprimer", fn: async () => { await q(sb.from("products").delete().eq("id", p.id)); toast("Annonce supprimée."); } })}>Supprimer</button></span></span>
      </div>`)}
      ${!mine.loading && !list.length && html`<${Empty} icon="store" title="Votre boutique est vide" text="Ajoutez votre premier produit ou service : il sera visible par tous les acheteurs de Joyau." />`}
    </div>
  </div>`;
}
function ShopForm({ edit }) {
  const cur = edit ? CACHE["my-shop"] : null;
  const me = S.me || {};
  const [f, setF] = useState(cur ? { name: cur.name, whatsapp: cur.whatsapp, city: cur.city || "", description: cur.description || "" } : { name: "", whatsapp: me.whatsapp || me.tel || "", city: me.ville || "", description: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const submit = async () => {
    if (!f.name.trim() || f.whatsapp.replace(/\D/g, "").length < 8) { setErr("Donnez un nom à votre boutique et un numéro WhatsApp valide."); return; }
    setBusy(true);
    try {
      const row = { name: f.name.trim(), whatsapp: f.whatsapp.trim(), city: f.city.trim() || "Abidjan", description: f.description.trim() };
      if (cur) await q(sb.from("shops").update(row).eq("id", cur.id)); else await q(sb.from("shops").insert(Object.assign({ owner: uid() }, row)));
      delete CACHE["my-shop"];
      if (cur) back();
      refresh(); toast(cur ? "Boutique mise à jour." : "Votre boutique est ouverte !");
    } catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay j-scope"><${OvHead} title=${cur ? "Modifier ma boutique" : "Ouvrir ma boutique"} />
    <div class="ov-body col" style="gap:14px">
      ${!cur && html`<div style="background:#1D4ED8;color:#fff;border-radius:20px;padding:18px" class="col"><b style="font-family:var(--f-head);font-size:20px">Gratuit, sans commission</b><span class="small" style="color:#DCE7FF;line-height:1.5">Vos produits sont vus par tous les acheteurs de Joyau. Les commandes arrivent directement sur votre WhatsApp.</span></div>`}
      <${Field} label="Nom de la boutique" req><input id="sh-name" class="input" value=${f.name} onInput=${set("name")} placeholder="Ex. Les Délices de Rose" /><//>
      <${Field} label="Numéro WhatsApp" req hint="Les acheteurs vous écrivent sur ce numéro. Format : 07 00 00 00 00 ou avec l'indicatif."><input id="sh-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} placeholder="07 00 00 00 00" /><//>
      <${Field} label="Ville ou quartier"><input id="sh-city" class="input" value=${f.city} onInput=${set("city")} placeholder="Cocody" /><//>
      <${Field} label="Présentation"><textarea id="sh-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Ce que vous vendez, vos délais de livraison…"></textarea><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} cls="btn btn-j btn-block" onClick=${submit}>${cur ? "Enregistrer" : "Ouvrir ma boutique"}<//>
    </div></div>`;
}
function ProductForm({ shop, edit }) {
  const e0 = edit || {};
  const [f, setF] = useState({ name: e0.name || "", cat: e0.cat || "Gastronomie", price: e0.price ? String(e0.price) : "", description: e0.description || "", opt_label: e0.opt_label || "Couleur", opts: (e0.opts || []).join(", "), size_label: e0.size_label || "Taille", sizes: (e0.sizes || []).join(", ") });
  const [photo, setPhoto] = useState(null); const [prev, setPrev] = useState(e0.photo_url || "");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const split = s => s.split(",").map(x => x.trim()).filter(Boolean);
  const submit = async () => {
    const price = parseInt(String(f.price).replace(/\D/g, ""), 10);
    if (!f.name.trim() || !(price >= 0) || isNaN(price) || (!photo && !prev)) { setErr("Ajoutez une photo, un nom et un prix."); return; }
    setBusy(true);
    try {
      const photo_url = photo ? publicUrl("products", await uploadFile("products", photo, "produit")) : e0.photo_url;
      const opts = split(f.opts), sizes = split(f.sizes);
      const row = { name: f.name.trim(), cat: f.cat, price, description: f.description.trim(), photo_url, opt_label: opts.length ? (f.opt_label.trim() || "Option") : "", opts, size_label: sizes.length ? (f.size_label.trim() || "Taille") : "", sizes };
      if (edit) await q(sb.from("products").update(row).eq("id", edit.id));
      else await q(sb.from("products").insert(Object.assign({ shop_id: shop.id, owner: uid() }, row)));
      back(); refresh(); toast(edit ? "Annonce mise à jour." : "Produit en ligne sur Joyau.");
    } catch (x) { fail(x); }
    setBusy(false);
  };
  return html`<div class="overlay j-scope"><${OvHead} title=${edit ? "Modifier l'annonce" : "Nouvelle annonce"} />
    <div class="ov-body col" style="gap:14px">
      <${Field} label="Photo" req><${Upload} id="pf-photo" icon="photo" label="Ajouter une photo" sub="Lumière naturelle, fond simple" preview=${prev} max=${1200} onFile=${(b, u) => { setPhoto(b); setPrev(u); }} /><//>
      <${Field} label="Nom du produit ou du service" req><input id="pp-name" class="input" value=${f.name} onInput=${set("name")} placeholder="Ex. Poulet braisé + attiéké" /><//>
      <${Field} label="Catégorie"><select id="pp-cat" class="input" value=${f.cat} onChange=${set("cat")}>${CATS.slice(1).map(c => html`<option key=${c} value=${c}>${c === "Services" ? "Prestations de services" : c}</option>`)}</select><//>
      <${Field} label="Prix (FCFA)" req hint="Pour un service ou un bien, indiquez un prix de départ."><input id="pp-price" class="input" inputmode="numeric" value=${f.price} onInput=${set("price")} placeholder="5000" /><//>
      <${Field} label="Description"><textarea id="pp-desc" class="input" value=${f.description} onInput=${set("description")} placeholder="Composition, état, délai de livraison…"></textarea><//>
      <div class="card col" style="gap:12px;border-color:var(--j-line)">
        <b>Choix proposés à l'acheteur <span class="small" style="color:var(--j-muted);font-weight:500">(facultatif)</span></b>
        <div class="row" style="gap:8px;align-items:flex-start"><input id="pp-optl" class="input" style="width:38%" value=${f.opt_label} onInput=${set("opt_label")} aria-label="Nom du choix 1" /><input id="pp-opts" class="input grow" value=${f.opts} onInput=${set("opts")} placeholder="Rouge, Noir, Blanc" aria-label="Valeurs du choix 1" /></div>
        <div class="row" style="gap:8px;align-items:flex-start"><input id="pp-sizel" class="input" style="width:38%" value=${f.size_label} onInput=${set("size_label")} aria-label="Nom du choix 2" /><input id="pp-sizes" class="input grow" value=${f.sizes} onInput=${set("sizes")} placeholder="S, M, L" aria-label="Valeurs du choix 2" /></div>
        <span class="tiny" style="color:var(--j-muted)">Séparez les valeurs par des virgules. Elles apparaîtront dans le message WhatsApp.</span>
      </div>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} cls="btn btn-j btn-block" onClick=${submit}>${edit ? "Enregistrer" : "Mettre en ligne"}<//>
    </div></div>`;
}

/* ===== Profil, installation, administration, navigation ===== */
function MyProfile() {
  const me = S.me;
  const stats = useData("my-stats", async () => {
    const [c, p, pr] = await Promise.all([
      sb.from("connections").select("id", { count: "exact", head: true }).eq("status", "accepted").or("requester.eq." + uid() + ",addressee.eq." + uid()),
      sb.from("posts").select("id", { count: "exact", head: true }).eq("author", uid()),
      sb.from("products").select("id", { count: "exact", head: true }).eq("owner", uid())
    ]);
    return { conns: c.count || 0, posts: p.count || 0, prods: pr.count || 0 };
  });
  const posts = useData("posts-of:" + uid(), () => q(sb.from("posts").select(POST_SEL).eq("author", uid()).order("created_at", { ascending: false }).limit(20)));
  const st = stats.data || { conns: 0, posts: 0, prods: 0 };
  const [busy, setBusy] = useState(false);
  const changePhoto = async e => {
    const f = e.target.files[0]; if (!f) return;
    setBusy(true);
    try { const b = await compress(f, 500); const url = publicUrl("avatars", await uploadFile("avatars", b, "photo")); await q(sb.from("profiles").update({ photo_url: url }).eq("id", uid())); await loadMe(); refresh(); toast("Photo de profil mise à jour."); }
    catch (x) { fail(x); }
    setBusy(false);
  };
  const age = me.naissance ? Math.floor((Date.now() - new Date(me.naissance).getTime()) / 31557600000) : null;
  return html`<div class="overlay">
    <${OvHead} title="Mon profil" />
    <div class="cover"></div>
    <div style="padding:0 16px;margin-top:-50px;position:relative" class="col">
      <label for="me-photo" style="position:relative;align-self:flex-start;cursor:pointer;border:4px solid #fff;border-radius:999px" aria-label="Changer ma photo">
        <${Avatar} p=${me} size=${96} />
        <span style="position:absolute;right:-2px;bottom:-2px;width:34px;height:34px;border-radius:999px;background:var(--ink);border:3px solid #fff;display:flex;align-items:center;justify-content:center">${busy ? html`<span class="spin sm" style="border-color:#fff;border-top-color:transparent"></span>` : html`<${Icon} n="camera" s=${16} c="#fff" />`}</span>
        <input id="me-photo" type="file" accept="image/*" class="sr" onChange=${changePhoto} />
      </label>
      <h2 style="font-size:24px">${fullName(me)}<${Verified} s=${18} />${isAdmin() && html` <span class="pill pill-gold" style="vertical-align:4px">Admin</span>`}</h2>
      <p class="muted">${jobLine(me)}</p>
      ${me.bio && html`<p style="line-height:1.55;font-size:14.5px">${me.bio}</p>`}
      <div class="col small" style="gap:7px;margin-top:2px">
        <span class="row" style="gap:8px"><${Icon} n="church" s=${17} c="#8E6A1C" />${me.eglise}, ${me.assemblee}</span>
        ${me.ville && html`<span class="row" style="gap:8px"><${Icon} n="pin" s=${17} c="#8E6A1C" />${me.ville}</span>`}
        ${(me.whatsapp || me.tel) && html`<span class="row" style="gap:8px"><${Icon} n="phone" s=${17} c="#8E6A1C" />${me.whatsapp || me.tel}</span>`}
        <span class="row" style="gap:8px"><${Icon} n="mail" s=${17} c="#8E6A1C" />${S.session.user.email}</span>
        ${age && html`<span class="row" style="gap:8px"><${Icon} n="calendar" s=${17} c="#8E6A1C" />${age} ans</span>`}
      </div>
      <div class="row" style="gap:8px;margin-top:10px"><div class="stat"><b>${st.conns}</b><span>relations</span></div><div class="stat"><b>${st.posts}</b><span>publications</span></div><div class="stat"><b>${st.prods}</b><span>annonces Joyau</span></div></div>
      <button class="btn btn-ink btn-block" style="margin-top:6px" onClick=${() => push("editProfile")}><${Icon} n="edit" s=${18} />Modifier mon profil</button>
    </div>
    <div class="ov-body" style="padding-top:12px">
      <button class="menu-row" onClick=${openShop}><span class="ic" style="background:#FFC93C"><${Bag} s=${24} /></span><span class="grow">Ma boutique Joyau<br /><span class="tiny muted" style="font-weight:500">Vendre aux acheteurs de Joyau</span></span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("favs")}><span class="ic"><${Icon} n="heart" s=${19} /></span><span class="grow">Mes favoris Joyau</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("pushSettings")}><span class="ic"><${Icon} n="bell" s=${19} /></span><span class="grow">Notifications sur ce téléphone</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${() => push("install")}><span class="ic"><${Icon} n="download" s=${19} /></span><span class="grow">Installer l'application</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      ${isAdmin() && html`<button class="menu-row" onClick=${() => push("admin")}><span class="ic" style="background:var(--gold-soft)"><${Icon} n="shield" s=${19} c="#8E6A1C" /></span><span class="grow">Espace administrateur<br /><span class="tiny muted" style="font-weight:500">Adhésions, offres d'emploi, annonces</span></span><${Icon} n="arrow" s=${18} c="#63666F" /></button>`}
      <button class="menu-row" onClick=${() => push("password")}><span class="ic"><${Icon} n="lock" s=${19} /></span><span class="grow">Changer mon mot de passe</span><${Icon} n="arrow" s=${18} c="#63666F" /></button>
      <button class="menu-row" onClick=${signOut}><span class="ic"><${Icon} n="logout" s=${19} /></span><span class="grow">Se déconnecter</span></button>
      <button class="menu-row" style="color:#B91C1C" onClick=${() => openSheet("confirm", { title: "Supprimer votre compte ?", text: "Votre profil, vos publications, vos messages et votre boutique Joyau seront effacés. Cette action est définitive.", ok: "Supprimer mon compte", fn: async () => { await q(sb.rpc("delete_my_account")); await signOut(); toast("Votre compte a été supprimé."); } })}><span class="ic" style="background:var(--danger-soft)"><${Icon} n="trash" s=${19} c="#B91C1C" /></span><span class="grow">Supprimer mon compte</span></button>
      ${(posts.data || []).length > 0 && html`<div class="section-title"><h2>Mes publications</h2></div>${posts.data.map(p => html`<${PostCard} key=${p.id} p=${p} />`)}`}
    </div>
  </div>`;
}

function EditProfile() {
  const me = S.me;
  const [f, setF] = useState({ nom: me.nom, prenoms: me.prenoms, profession: me.profession, entreprise: me.entreprise || "", bio: me.bio || "", eglise: me.eglise, assemblee: me.assemblee, ville: me.ville || "", tel: me.tel || "", whatsapp: me.whatsapp || "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = k => e => setF(Object.assign({}, f, { [k]: e.target.value }));
  const saveP = async () => {
    if (!f.nom.trim() || !f.prenoms.trim() || !f.profession.trim() || !f.eglise.trim() || !f.assemblee.trim() || !f.tel.trim()) { setErr("Nom, prénoms, profession, église, assemblée et téléphone sont obligatoires."); return; }
    if (f.tel.replace(/\D/g, "").length < 8) { setErr("Numéro de téléphone incomplet."); return; }
    setBusy(true);
    try { const row = {}; for (const k in f) row[k] = f[k].trim(); row.nom = row.nom.toUpperCase(); await q(sb.from("profiles").update(row).eq("id", uid())); await loadMe(); back(); refresh(); toast("Profil enregistré."); }
    catch (e) { fail(e); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Modifier mon profil" />
    <div class="ov-body col" style="gap:14px">
      <div class="row" style="gap:10px;align-items:flex-start"><div class="grow"><${Field} label="Nom" req><input id="ep-nom" class="input" value=${f.nom} onInput=${set("nom")} /><//></div><div class="grow"><${Field} label="Prénoms" req><input id="ep-prenoms" class="input" value=${f.prenoms} onInput=${set("prenoms")} /><//></div></div>
      <${Field} label="Profession" req><input id="ep-prof" class="input" value=${f.profession} onInput=${set("profession")} /><//>
      <${Field} label="Entreprise / Administration"><input id="ep-ent" class="input" value=${f.entreprise} onInput=${set("entreprise")} /><//>
      <${Field} label="Présentation"><textarea id="ep-bio" class="input" value=${f.bio} onInput=${set("bio")} placeholder="Quelques mots sur vous et votre métier"></textarea><//>
      <${Field} label="Église" req><input id="ep-eglise" class="input" value=${f.eglise} onInput=${set("eglise")} /><//>
      <${Field} label="Assemblée" req><input id="ep-ass" class="input" value=${f.assemblee} onInput=${set("assemblee")} /><//>
      <${Field} label="Ville"><input id="ep-ville" class="input" value=${f.ville} onInput=${set("ville")} /><//>
      <${Field} label="Téléphone" req><input id="ep-tel" class="input" inputmode="tel" value=${f.tel} onInput=${set("tel")} /><//>
      <${Field} label="WhatsApp" hint="Visible par vos relations uniquement."><input id="ep-wa" class="input" inputmode="tel" value=${f.whatsapp} onInput=${set("whatsapp")} /><//>
      ${err && html`<span class="err-msg">${err}</span>`}
      <${Busy} on=${busy} onClick=${saveP}>Enregistrer<//>
    </div></div>`;
}
function ChangePassword() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (pw.length < 8) { setErr("8 caractères minimum."); return; }
    if (pw !== pw2) { setErr("Les deux mots de passe ne correspondent pas."); return; }
    setBusy(true);
    try { await q(sb.auth.updateUser({ password: pw })); back(); toast("Mot de passe modifié."); } catch (e) { setErr(errText(e)); }
    setBusy(false);
  };
  return html`<div class="overlay"><${OvHead} title="Changer mon mot de passe" /><div class="ov-body col" style="gap:14px">
    <${Field} label="Nouveau mot de passe" hint="8 caractères minimum"><input id="cp-1" class="input" type="password" autocomplete="new-password" value=${pw} onInput=${e => setPw(e.target.value)} /><//>
    <${Field} label="Confirmer"><input id="cp-2" class="input" type="password" autocomplete="new-password" value=${pw2} onInput=${e => setPw2(e.target.value)} /><//>
    ${err && html`<span class="err-msg">${err}</span>`}
    <${Busy} on=${busy} onClick=${submit}>Enregistrer<//>
  </div></div>`;
}

function PushSettings() {
  const [st, setSt] = useState("…"); const [busy, setBusy] = useState(false);
  const reload = () => pushState().then(setSt);
  useEffect(() => { reload(); }, []);
  const off = async () => { setBusy(true); try { await disablePush(); toast("Notifications désactivées sur ce téléphone."); } catch (e) { fail(e); } setBusy(false); reload(); };
  const test = async () => { try { const reg = await navigator.serviceWorker.ready; await reg.showNotification("Force Chrétienne", { body: "Les notifications fonctionnent sur ce téléphone.", icon: "/icon-192.png" }); } catch (e) { toast("Impossible d'afficher la notification de test."); } };
  return html`<div class="overlay"><${OvHead} title="Notifications" />
    <div class="ov-body col" style="gap:14px">
      <p class="muted" style="line-height:1.55">Vous êtes prévenu sur ce téléphone pour : les nouveaux messages, les invitations et nouvelles relations, les commentaires et j'aime sur vos publications, les candidatures à vos offres, la validation de vos offres et de votre adhésion${isAdmin() ? ", et (administrateur) les adhésions et offres à valider" : ""}.</p>
      ${st === "on" ? html`<div class="feature" style="background:var(--ok-soft)"><span class="ic"><${Icon} n="check" c="#15803D" /></span><span><b style="color:#15803D">Activées sur ce téléphone</b><br /><span class="small muted">Chaque appareil s'active séparément.</span></span></div>
        <button class="btn btn-line btn-block" onClick=${test}>Envoyer une notification de test</button>
        <${Busy} on=${busy} cls="btn btn-ghost btn-block" onClick=${off}>Désactiver sur ce téléphone<//>`
        : html`<${PushCard} onDone=${reload} />`}
    </div></div>`;
}

/* ---------- Installation (PWA) ---------- */
let INSTALL_EVT = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); INSTALL_EVT = e; rerender(); });
function Install() {
  const [os, setOs] = useState(/iPhone|iPad|iPod/.test(navigator.userAgent) ? "ios" : "android");
  const step = (n, t) => html`<div class="row" style="align-items:flex-start;gap:12px"><span class="logo-sq" style="width:34px;height:34px;border-radius:11px;background:var(--gold);color:var(--ink);font-size:15px">${n}</span><span style="line-height:1.5;padding-top:6px">${t}</span></div>`;
  const host = location.host;
  return html`<div class="overlay"><${OvHead} title="Installer l'application" />
    <div class="ov-body col" style="gap:16px">
      <div class="row card" style="background:var(--soft);border:0"><span style="width:64px;height:64px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(35,38,45,.1)"><${Shield} s=${46} /></span><span class="grow"><b style="font-family:var(--f-brand);letter-spacing:1px">FORCE CHRÉTIENNE</b><br /><span class="small muted">Gratuite · s'installe en 10 secondes, sans passer par un store</span></span></div>
      ${isStandalone() ? html`<div class="demo-note" style="background:var(--ok-soft);color:var(--ok)"><b>L'application est déjà installée</b> sur cet appareil.</div>`
        : INSTALL_EVT && html`<button class="btn btn-gold btn-block" style="height:54px" onClick=${async () => { INSTALL_EVT.prompt(); try { await INSTALL_EVT.userChoice; } catch (e) {} INSTALL_EVT = null; rerender(); }}><${Icon} n="download" s=${20} />Installer maintenant</button>`}
      <div class="seg"><button class=${os === "android" ? "on" : ""} onClick=${() => setOs("android")}>Android</button><button class=${os === "ios" ? "on" : ""} onClick=${() => setOs("ios")}>iPhone</button></div>
      ${os === "android" ? html`<div class="col" style="gap:14px">${step(1, html`Ouvrez <b>${host}</b> dans <b>Chrome</b>.`)}${step(2, html`Touchez <b>Installer</b> en bas de l'écran, ou le menu <b>⋮</b> puis <b>Installer l'application</b>.`)}${step(3, html`L'icône Force Chrétienne apparaît sur votre écran d'accueil.`)}</div>`
        : html`<div class="col" style="gap:14px">${step(1, html`Ouvrez <b>${host}</b> dans <b>Safari</b>.`)}${step(2, html`Touchez le bouton <b>Partager</b> (le carré avec une flèche vers le haut).`)}${step(3, html`Choisissez <b>Sur l'écran d'accueil</b>, puis <b>Ajouter</b>.`)}${step(4, html`Ouvrez ensuite l'application depuis son icône.`)}</div>`}
    </div></div>`;
}

/* ---------- Administration ---------- */
function Admin() {
  const [t, setT] = useState("members");
  const stats = useData("admin-stats", () => q(sb.rpc("admin_stats")));
  const st = stats.data || {};
  return html`<div class="overlay"><${OvHead} title="Espace administrateur" />
    <div class="ov-body col" style="gap:14px">
      <div class="row" style="gap:8px"><div class="stat"><b>${st.members || 0}</b><span>membres</span></div><div class="stat"><b>${st.pending || 0}</b><span>adhésions</span></div><div class="stat"><b>${st.jobs_pending || 0}</b><span>offres à valider</span></div></div>
      <div class="row" style="gap:8px"><div class="stat"><b>${st.shops || 0}</b><span>boutiques</span></div><div class="stat"><b>${st.products || 0}</b><span>annonces Joyau</span></div></div>
      <div class="seg"><button class=${t === "members" ? "on" : ""} onClick=${() => setT("members")}>Adhésions</button><button class=${t === "jobs" ? "on" : ""} onClick=${() => setT("jobs")}>Emplois</button><button class=${t === "joyau" ? "on" : ""} onClick=${() => setT("joyau")}>Joyau</button><button class=${t === "all" ? "on" : ""} onClick=${() => setT("all")}>Membres</button></div>
      ${t === "members" ? html`<${AdminMembers} />` : t === "jobs" ? html`<${AdminJobs} />` : t === "joyau" ? html`<${AdminJoyau} />` : html`<${AdminAll} />`}
    </div></div>`;
}
function Candidate({ k }) {
  const [carte, setCarte] = useState(null); const [busy, setBusy] = useState("");
  const isPdf = /\.pdf$/i.test(k.carte_path || "");
  const view = async () => {
    if (carte) { setCarte(null); return; }
    if (!k.carte_path) { toast("Aucune carte envoyée."); return; }
    try { setCarte({ recto: await signedUrl("cards", k.carte_path), verso: k.carte_verso_path ? await signedUrl("cards", k.carte_verso_path) : "" }); } catch (e) { fail(e); }
  };
  const decide = async st => { setBusy(st); try { await q(sb.from("profiles").update({ status: st }).eq("id", k.id)); toast(st === "active" ? fullName(k) + " est maintenant membre." : "Adhésion refusée. Le demandeur est prévenu."); refresh(); } catch (e) { fail(e); } setBusy(""); };
  return html`<div class="card col" style="gap:10px">
    <span class="row"><${Avatar} p=${k} size=${48} /><span class="grow"><b>${fullName(k)}</b><br /><span class="small muted">${jobLine(k)}${k.ville ? " · " + k.ville : ""}</span></span><span class="tiny muted">${ago(k.created_at)}</span></span>
    <span class="small" style="line-height:1.6"><b>Église :</b> ${k.eglise}<br /><b>Assemblée :</b> ${k.assemblee}${k.naissance ? html`<br /><b>Né(e) le :</b> ${k.naissance.split("-").reverse().join("/")}` : ""}<br /><b>E-mail :</b> ${k.mail}${k.whatsapp ? html`<br /><b>WhatsApp :</b> ${k.whatsapp}` : ""}</span>
    <button class="btn btn-line btn-sm" onClick=${view}><${Icon} n=${isPdf ? "file" : "card"} s=${17} />${carte ? "Masquer" : "Voir"} la carte de membre${isPdf ? " (PDF)" : ""}</button>
    ${carte && isPdf && html`<a class="btn btn-ink btn-sm" href=${carte.recto} target="_blank" rel="noopener"><${Icon} n="file" s=${16} />Ouvrir le PDF de la carte</a><span class="tiny muted center">Le PDF doit contenir le recto et le verso.</span>`}
    ${carte && !isPdf && html`<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
      ${[["Recto", carte.recto], ["Verso", carte.verso]].map(([l, u]) => html`<div key=${l} class="col" style="gap:4px"><span class="tiny bold muted">${l}</span>${u ? html`<a href=${u} target="_blank" rel="noopener" title="Agrandir"><img src=${u} alt=${l + " de la carte de " + fullName(k)} style="width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:12px;border:1px solid var(--line);display:block" /></a>` : html`<span class="small muted" style="aspect-ratio:3/2;border-radius:12px;background:var(--soft);display:flex;align-items:center;justify-content:center;text-align:center;padding:8px">Non fourni (ancienne inscription)</span>`}</div>`)}
    </div><span class="tiny muted center">Touchez une photo pour l'agrandir.</span>`}
    <span class="row" style="gap:8px"><${Busy} on=${busy === "active"} cls="btn btn-gold btn-sm grow" onClick=${() => decide("active")}><${Icon} n="check" s=${17} w=${2.6} />Valider<//><${Busy} on=${busy === "refused"} cls="btn btn-danger btn-sm grow" onClick=${() => decide("refused")}>Refuser<//></span>
  </div>`;
}
function AdminMembers() {
  const c = useData("admin-pending", () => q(sb.from("profiles").select("*").eq("status", "pending").order("created_at")));
  return html`<div class="col">${c.loading && !c.data && html`<${Loading} />`}${(c.data || []).map(k => html`<${Candidate} key=${k.id} k=${k} />`)}${!c.loading && !(c.data || []).length && html`<${Empty} icon="shield" title="Aucune adhésion en attente" />`}</div>`;
}
function AdminJobs() {
  const j = useData("admin-jobs", () => q(sb.from("jobs").select("*, a:profiles!jobs_author_fkey(" + PROFILE_COLS + ")").eq("status", "pending").order("created_at")));
  const decide = async (x, st) => { try { await q(sb.from("jobs").update({ status: st }).eq("id", x.id)); toast(st === "online" ? "Offre publiée." : "Offre refusée."); refresh(); } catch (e) { fail(e); } };
  return html`<div class="col">${j.loading && !j.data && html`<${Loading} />`}
    ${(j.data || []).map(x => html`<div key=${x.id} class="card col" style="gap:8px"><b>${x.title}</b><span class="small muted">${x.company} · ${x.place} · ${x.contract} · ${x.salary}</span><p class="small" style="line-height:1.5;white-space:pre-wrap">${x.description}</p><span class="tiny muted">Proposée par ${fullName(x.a)} · ${ago(x.created_at)}</span>
      <span class="row" style="gap:8px"><button class="btn btn-gold btn-sm grow" onClick=${() => decide(x, "online")}>Publier</button><button class="btn btn-danger btn-sm grow" onClick=${() => decide(x, "refused")}>Refuser</button></span></div>`)}
    ${!j.loading && !(j.data || []).length && html`<${Empty} icon="brief" title="Aucune offre à valider" />`}</div>`;
}
function AdminJoyau() {
  const p = useData("admin-products", () => q(sb.from("products").select("*, shops(name)").order("created_at", { ascending: false }).limit(300)));
  const toggle = async x => { try { await q(sb.from("products").update({ status: x.status === "hidden_admin" ? "online" : "hidden_admin" }).eq("id", x.id)); refresh(); } catch (e) { fail(e); } };
  return html`<div class="col"><p class="small muted">Masquez une annonce qui ne respecte pas la charte. Le vendeur ne pourra pas la remettre en ligne lui-même.</p>
    ${(p.data || []).map(x => html`<div key=${x.id} class="list-row"><span style="width:46px;height:46px;border-radius:12px;background:var(--j-soft);overflow:hidden;flex:none"><img src=${x.photo_url} alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy" /></span><span class="grow" style="min-width:0"><b class="small" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.name}</b><span class="tiny muted">${x.shops ? x.shops.name : ""} · ${fmt(x.price)}${x.status !== "online" ? " · masquée" : ""}</span></span>
      <button class=${"btn btn-sm " + (x.status === "hidden_admin" ? "btn-ghost" : "btn-line")} onClick=${() => toggle(x)}>${x.status === "hidden_admin" ? "Rétablir" : "Masquer"}</button></div>`)}
    ${!p.loading && !(p.data || []).length && html`<${Empty} icon="store" title="Aucune annonce pour l'instant" />`}</div>`;
}
function AdminAll() {
  const [qq, setQ] = useState("");
  const m = useData("admin-all", () => q(sb.from("profiles").select("*").neq("status", "pending").order("created_at", { ascending: false }).limit(1000)));
  const list = (m.data || []).filter(x => !qq || [fullName(x), x.mail, x.eglise].join(" ").toLowerCase().includes(qq.toLowerCase()));
  const setStatus = async (x, st) => { try { await q(sb.from("profiles").update({ status: st }).eq("id", x.id)); refresh(); toast(st === "active" ? "Membre réactivé." : "Membre suspendu."); } catch (e) { fail(e); } };
  return html`<div class="col">
    <div class="search"><${Icon} n="search" s=${19} c="#63666F" /><input id="adm-q" class="input" value=${qq} onInput=${e => setQ(e.target.value)} placeholder="Nom, e-mail, église…" /></div>
    ${list.map(x => html`<div key=${x.id} class="list-row"><${Avatar} p=${x} size=${42} /><span class="grow" style="min-width:0"><b class="small">${fullName(x)}</b>${x.role === "admin" && html` <span class="pill pill-gold">Admin</span>`}<br /><span class="tiny muted">${x.mail} · ${x.status === "active" ? "membre" : "refusé / suspendu"}</span></span>
      ${x.role !== "admin" && (x.status === "active" ? html`<button class="btn btn-line btn-sm" onClick=${() => openSheet("confirm", { title: "Suspendre " + fullName(x) + " ?", text: "Il n'aura plus accès au réseau tant que vous ne l'aurez pas réactivé.", ok: "Suspendre", fn: () => setStatus(x, "refused") })}>Suspendre</button>` : html`<button class="btn btn-ghost btn-sm" onClick=${() => setStatus(x, "active")}>Réactiver</button>`)}</div>`)}
  </div>`;
}

function ConfirmSheet({ title, text, ok, fn }) {
  const [busy, setBusy] = useState(false);
  return html`<${Sheet}><div class="col" style="gap:12px;padding-bottom:4px"><h2 style="font-size:20px">${title}</h2><p class="muted" style="line-height:1.55">${text}</p>
    <${Busy} on=${busy} cls="btn btn-block" style="background:#B91C1C;color:#fff" onClick=${async () => { setBusy(true); try { await fn(); UI.sheet = null; refresh(); } catch (e) { fail(e); } setBusy(false); }}>${ok}<//><button class="btn btn-ghost btn-block" onClick=${closeSheet}>Annuler</button></div><//>`;
}

/* ---------- Navigation ---------- */
function Nav() {
  const tabs = [["home", "Accueil", "home"], ["network", "Réseau", "users"], ["joyau", "Joyau", ""], ["messages", "Messages", "chat"], ["opps", "Opportunités", "brief"]];
  const u = useUnread();
  return html`<nav class="nav" aria-label="Navigation principale">
    ${tabs.map(([k, label, ic]) => k === "joyau"
      ? html`<button key=${k} class=${"joyau-tab" + (UI.tab === k ? " on" : "")} aria-current=${UI.tab === k ? "page" : null} onClick=${() => go(k)}><span class="jt-icon"><${Bag} s=${32} /></span>${label}</button>`
      : html`<button key=${k} class=${UI.tab === k ? "on" : ""} aria-current=${UI.tab === k ? "page" : null} onClick=${() => { if (!isMember()) { openSheet("join", { what: label === "Messages" ? "La messagerie" : label === "Réseau" ? "Le réseau" : label === "Accueil" ? "Le fil d'actualité" : "L'espace Opportunités" }); return; } go(k); }}><${Icon} n=${ic} s=${23} w=${UI.tab === k ? 2.3 : 1.9} />${label}${k === "messages" && u.msgs ? html`<span class="dot">${u.msgs}</span>` : ""}</button>`)}
  </nav>`;
}

function OverlayView({ o }) {
  switch (o.type) {
    case "profile": return html`<${Profile} id=${o.id} />`;
    case "compose": return html`<${Compose} kind=${o.kind} />`;
    case "chat": return html`<${Chat} id=${o.id} />`;
    case "notifs": return html`<${Notifs} />`;
    case "jobForm": return html`<${JobForm} />`;
    case "servForm": return html`<${ServForm} />`;
    case "dealForm": return html`<${DealForm} />`;
    case "product": return html`<${Product} id=${o.id} />`;
    case "seller": return html`<${Seller} id=${o.id} />`;
    case "favs": return html`<${Favs} />`;
    case "shop": return html`<${Shop} />`;
    case "shopEdit": return html`<${ShopForm} edit />`;
    case "productForm": return html`<${ProductForm} shop=${o.shop} edit=${o.edit} />`;
    case "editProfile": return html`<${EditProfile} />`;
    case "password": return html`<${ChangePassword} />`;
    case "install": return html`<${Install} />`;
    case "pushSettings": return html`<${PushSettings} />`;
    case "admin": return isAdmin() ? html`<${Admin} />` : null;
  }
  return null;
}
function SheetView({ s }) {
  switch (s.type) {
    case "join": return html`<${JoinPrompt} what=${s.what} />`;
    case "job": return html`<${JobSheet} j=${s.j} />`;
    case "wa": return html`<${WaSheet} msg=${s.msg} num=${s.num} seller=${s.seller} />`;
    case "newMsg": return html`<${NewMsgSheet} />`;
    case "confirm": return html`<${ConfirmSheet} ...${s} />`;
    case "installJoyau": return html`<${InstallJoyauSheet} />`;
    case "copy": return html`<${Sheet}><div class="col" style="gap:12px"><h2 style="font-size:19px">Copiez ce lien</h2><input id="copy-url" class="input" readonly value=${s.url} onFocus=${e => e.target.select()} /><button class="btn btn-ink btn-block" onClick=${closeSheet}>Fermer</button></div><//>`;
  }
  return null;
}

function App() {
  const [, setTick] = useState(0);
  useEffect(() => { rerender = () => setTick(t => t + 1); boot(); }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") { if (UI.sheet) closeSheet(); else if (UI.stack.length) back(); } };
    addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey);
  }, []);
  const top = UI.stack[UI.stack.length - 1];
  let screen;
  if (!S.booted) screen = html`<div class="welcome" style="align-items:center;justify-content:center;gap:18px"><${Shield} s=${84} /><span class="spin"></span></div>`;
  else if (JOYAU_MODE) screen = html`<main><${JoyauTab} /></main>`;
  else if (S.recovery && S.session) screen = html`<${NewPassword} />`;
  else if (UI.start === "login" && !S.session) screen = html`<${Login} />`;
  else if (UI.start === "signup" && !S.session) screen = html`<${Signup} />`;
  else if (isMember() || S.guest) {
    if (!isMember() && UI.tab !== "joyau") UI.tab = "joyau";
    const tab = UI.tab;
    screen = html`<div>
      ${tab !== "joyau" && html`<${TopBar} />`}
      <main>${tab === "home" ? html`<${HomeTab} />` : tab === "network" ? html`<${NetworkTab} />` : tab === "messages" ? html`<${MessagesTab} />` : tab === "opps" ? html`<${OppsTab} />` : html`<${JoyauTab} />`}</main>
      <${Nav} />
    </div>`;
  }
  else if (S.session && !S.me) screen = html`<${ProfileSetup} />`;
  else if (S.me && S.me.status === "refused") screen = html`<${ProfileSetup} redo />`;
  else if (S.me && S.me.status === "pending") screen = html`<${Pending} />`;
  else screen = html`<${Welcome} />`;
  return html`<div class="shell">
    ${screen}
    ${S.booted && top && html`<${OverlayView} key=${UI.stack.length + top.type} o=${top} />`}
    ${UI.sheet && html`<${SheetView} s=${UI.sheet} />`}
    ${UI.toast && html`<div class="toast" role="status">${UI.toast}</div>`}
  </div>`;
}

render(html`<${App} />`, document.getElementById("app"));
if ("serviceWorker" in navigator && location.protocol === "https:") addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
