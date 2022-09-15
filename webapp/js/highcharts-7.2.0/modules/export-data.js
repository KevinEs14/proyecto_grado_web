/*
 Highcharts JS v7.2.0 (2019-09-03)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (b) { "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/export-data", ["highcharts", "highcharts/modules/exporting"], function (m) { b(m); b.Highcharts = m; return b }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (b) {
    function m(a, c, b, E) { a.hasOwnProperty(c) || (a[c] = E.apply(null, b)) } b = b ? b._modules : {}; m(b, "mixins/ajax.js", [b["parts/Globals.js"], b["parts/Utilities.js"]], function (a, c) {
        var b = c.objectEach;
        a.ajax = function (c) {
            var h = a.merge(!0, { url: !1, type: "get", dataType: "json", success: !1, error: !1, data: !1, headers: {} }, c); c = { json: "application/json", xml: "application/xml", text: "text/plain", octet: "application/octet-stream" }; var f = new XMLHttpRequest; if (!h.url) return !1; f.open(h.type.toUpperCase(), h.url, !0); h.headers["Content-Type"] || f.setRequestHeader("Content-Type", c[h.dataType] || c.text); b(h.headers, function (e, a) { f.setRequestHeader(a, e) }); f.onreadystatechange = function () {
                if (4 === f.readyState) {
                    if (200 === f.status) {
                        var a =
                            f.responseText; if ("json" === h.dataType) try { a = JSON.parse(a) } catch (n) { h.error && h.error(f, n); return } return h.success && h.success(a)
                    } h.error && h.error(f, f.responseText)
                }
            }; try { h.data = JSON.stringify(h.data) } catch (e) { } f.send(h.data || !0)
        }; a.getJSON = function (c, b) { a.ajax({ url: c, success: b, dataType: "json", headers: { "Content-Type": "text/plain" } }) }
    }); m(b, "mixins/download-url.js", [b["parts/Globals.js"]], function (a) {
        var c = a.win, b = c.navigator, m = c.document, h = c.URL || c.webkitURL || c, f = /Edge\/\d+/.test(b.userAgent); a.dataURLtoBlob =
            function (a) { if ((a = a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < a.length && c.atob && c.ArrayBuffer && c.Uint8Array && c.Blob && h.createObjectURL) { var b = c.atob(a[3]), e = new c.ArrayBuffer(b.length); e = new c.Uint8Array(e); for (var f = 0; f < e.length; ++f)e[f] = b.charCodeAt(f); a = new c.Blob([e], { type: a[1] }); return h.createObjectURL(a) } }; a.downloadURL = function (e, h) {
                var d = m.createElement("a"); if ("string" === typeof e || e instanceof String || !b.msSaveOrOpenBlob) {
                    if (f || 2E6 < e.length) if (e = a.dataURLtoBlob(e), !e) throw Error("Failed to convert to blob");
                    if (void 0 !== d.download) d.href = e, d.download = h, m.body.appendChild(d), d.click(), m.body.removeChild(d); else try { var n = c.open(e, "chart"); if (void 0 === n || null === n) throw Error("Failed to open window"); } catch (y) { c.location.href = e }
                } else b.msSaveOrOpenBlob(e, h)
            }
    }); m(b, "modules/export-data.src.js", [b["parts/Globals.js"], b["parts/Utilities.js"]], function (a, c) {
        function b(a, b) {
            var c = e.navigator, q = -1 < c.userAgent.indexOf("WebKit") && 0 > c.userAgent.indexOf("Chrome"), l = e.URL || e.webkitURL || e; try {
                if (c.msSaveOrOpenBlob &&
                    e.MSBlobBuilder) { var f = new e.MSBlobBuilder; f.append(a); return f.getBlob("image/svg+xml") } if (!q) return l.createObjectURL(new e.Blob(["\ufeff" + a], { type: b }))
            } catch (F) { }
        } var m = c.defined, h = c.isObject, f = a.pick, e = a.win, n = e.document, d = a.seriesTypes, C = a.downloadURL, y = a.fireEvent; a.setOptions({
            exporting: { csv: { columnHeaderFormatter: null, dateFormat: "%Y-%m-%d %H:%M:%S", decimalPoint: null, itemDelimiter: null, lineDelimiter: "\n" }, showTable: !1, useMultiLevelHeaders: !0, useRowspanHeaders: !0 }, lang: {
                downloadCSV: "Download CSV", downloadXLSX: "Download XLSX",
                downloadXLS: "Download XLS", openInCloud: "Open in Highcharts Cloud", viewData: "View data table"
            }
        }); a.addEvent(a.Chart, "render", function () { this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport && this.viewData() }); a.Chart.prototype.setUpKeyToAxis = function () { d.arearange && (d.arearange.prototype.keyToAxis = { low: "y", high: "y" }); d.gantt && (d.gantt.prototype.keyToAxis = { start: "x", end: "x" }) }; a.Chart.prototype.getDataRows = function (b) {
            var c = this.time, e = this.options.exporting &&
                this.options.exporting.csv || {}, h = this.xAxis, l = {}, q = [], d = [], A = [], w, t = function (k, c, g) { if (e.columnHeaderFormatter) { var l = e.columnHeaderFormatter(k, c, g); if (!1 !== l) return l } return k ? k instanceof a.Axis ? k.options.title && k.options.title.text || (k.isDatetimeAxis ? "DateTime" : "Category") : b ? { columnTitle: 1 < g ? c : k.name, topLevelColumnTitle: k.name } : k.name + (1 < g ? " (" + c + ")" : "") : "Category" }, u = []; var v = 0; this.setUpKeyToAxis(); this.series.forEach(function (k) {
                    var g = k.options.keys || k.pointArrayMap || ["y"], q = g.length, r = !k.requireSorting &&
                        {}, D = {}, x = {}, z = h.indexOf(k.xAxis), p; g.forEach(function (a) { var g = (k.keyToAxis && k.keyToAxis[a] || a) + "Axis"; D[a] = k[g] && k[g].categories || []; x[a] = k[g] && k[g].isDatetimeAxis }); if (!1 !== k.options.includeInDataExport && !k.options.isInternal && !1 !== k.visible) {
                            a.find(u, function (a) { return a[0] === z }) || u.push([z, v]); for (p = 0; p < q;)w = t(k, g[p], g.length), A.push(w.columnTitle || w), b && d.push(w.topLevelColumnTitle || w), p++; var m = { chart: k.chart, autoIncrement: k.autoIncrement, options: k.options, pointArrayMap: k.pointArrayMap }; k.options.data.forEach(function (a,
                                b) { var h = { series: m }; k.pointClass.prototype.applyOptions.apply(h, [a]); a = h.x; var d = k.data[b] && k.data[b].name; p = 0; k.xAxis && "name" !== k.exportKey || (a = d); r && (r[a] && (a += "|" + b), r[a] = !0); l[a] || (l[a] = [], l[a].xValues = []); l[a].x = h.x; l[a].name = d; for (l[a].xValues[z] = h.x; p < q;)b = g[p], d = h[b], l[a][v + p] = f(D[b][d], x[b] ? c.dateFormat(e.dateFormat, d) : null, d), p++ }); v += p
                        }
                }); for (g in l) Object.hasOwnProperty.call(l, g) && q.push(l[g]); var g = b ? [d, A] : [A]; for (v = u.length; v--;) {
                    var B = u[v][0]; var p = u[v][1]; var r = h[B]; q.sort(function (a,
                        b) { return a.xValues[B] - b.xValues[B] }); var x = t(r); g[0].splice(p, 0, x); b && g[1] && g[1].splice(p, 0, x); q.forEach(function (a) { var b = a.name; r && !m(b) && (r.isDatetimeAxis ? (a.x instanceof Date && (a.x = a.x.getTime()), b = c.dateFormat(e.dateFormat, a.x)) : b = r.categories ? f(r.names[a.x], r.categories[a.x], a.x) : a.x); a.splice(p, 0, b) })
                } g = g.concat(q); y(this, "exportData", { dataRows: g }); return g
        }; a.Chart.prototype.getCSV = function (a) {
            var b = "", c = this.getDataRows(), e = this.options.exporting.csv, h = f(e.decimalPoint, "," !== e.itemDelimiter &&
                a ? (1.1).toLocaleString()[1] : "."), q = f(e.itemDelimiter, "," === h ? ";" : ","), d = e.lineDelimiter; c.forEach(function (a, e) { for (var f, l = a.length; l--;)f = a[l], "string" === typeof f && (f = '"' + f + '"'), "number" === typeof f && "." !== h && (f = f.toString().replace(".", h)), a[l] = f; b += a.join(q); e < c.length - 1 && (b += d) }); return b
        }; a.Chart.prototype.getTable = function (a) {
            var b = '<table id="highcharts-data-table-' + this.index + '">', c = this.options, e = a ? (1.1).toLocaleString()[1] : ".", h = f(c.exporting.useMultiLevelHeaders, !0); a = this.getDataRows(h);
            var d = 0, q = h ? a.shift() : null, m = a.shift(), n = function (a, b, c, h) { var g = f(h, ""); b = "text" + (b ? " " + b : ""); "number" === typeof g ? (g = g.toString(), "," === e && (g = g.replace(".", e)), b = "number") : h || (b = "empty"); return "<" + a + (c ? " " + c : "") + ' class="' + b + '">' + g + "</" + a + ">" }; !1 !== c.exporting.tableCaption && (b += '<caption class="highcharts-table-caption">' + f(c.exporting.tableCaption, c.title.text ? c.title.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g,
                "&#x2F;") : "Chart") + "</caption>"); for (var t = 0, u = a.length; t < u; ++t)a[t].length > d && (d = a[t].length); b += function (a, b, e) {
                    var f = "<thead>", g = 0; e = e || b && b.length; var d, k = 0; if (d = h && a && b) { a: if (d = a.length, b.length === d) { for (; d--;)if (a[d] !== b[d]) { d = !1; break a } d = !0 } else d = !1; d = !d } if (d) {
                        for (f += "<tr>"; g < e; ++g) {
                            d = a[g]; var l = a[g + 1]; d === l ? ++k : k ? (f += n("th", "highcharts-table-topheading", 'scope="col" colspan="' + (k + 1) + '"', d), k = 0) : (d === b[g] ? c.exporting.useRowspanHeaders ? (l = 2, delete b[g]) : (l = 1, b[g] = "") : l = 1, f += n("th", "highcharts-table-topheading",
                                'scope="col"' + (1 < l ? ' valign="top" rowspan="' + l + '"' : ""), d))
                        } f += "</tr>"
                    } if (b) { f += "<tr>"; g = 0; for (e = b.length; g < e; ++g)void 0 !== b[g] && (f += n("th", null, 'scope="col"', b[g])); f += "</tr>" } return f + "</thead>"
                }(q, m, Math.max(d, m.length)); b += "<tbody>"; a.forEach(function (a) { b += "<tr>"; for (var c = 0; c < d; c++)b += n(c ? "td" : "th", null, c ? "" : 'scope="row"', a[c]); b += "</tr>" }); b += "</tbody></table>"; a = { html: b }; y(this, "afterGetTable", a); return a.html
        }; a.Chart.prototype.downloadCSV = function () {
            var a = this.getCSV(!0); C(b(a, "text/csv") ||
                "data:text/csv,\ufeff" + encodeURIComponent(a), this.getFilename() + ".csv")
        }; a.Chart.prototype.downloadXLS = function () {
            var a = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
                this.getTable(!0) + "</body></html>"; C(b(a, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + e.btoa(unescape(encodeURIComponent(a))), this.getFilename() + ".xls")
        }; 

        /**
         * Get the data rows as a two dimensional array
         * Modificación de INCLAM para obtener solamente los datos en su estado inicial.
         * Hace uso de la opción exportingData de la serie. Que debe ser rellenada al crearla.
         */
        a.Chart.prototype.getDataRows_INCLAM = function () {
            // opciones generales
            this.options.exporting.csv = (this.options.exporting || {}).csv || {};

	    let dateFormat = 'YYYY-MM-DD HH:mm:ss';
            if (this.options.exporting.csv.dateFormat && this.options.exporting.csv.dateFormat !== "%Y-%m-%d %H:%M:%S") {
                dateFormat = this.options.exporting.csv.dateFormat;
            }
	    this.options.exporting.csv.dateFormat = '%Y-%m-%d %H:%M:%S'; //'%Y-%m-%d';
            this.series.forEach(function (series) {
                if (series.options.name.toLowerCase().startsWith("navigator")) series.options.includeInCSVExport = false;
            });

	    let temp = [];
	    const that = this;
	    const rows = this.getDataRows();

	    if (this.options.xAxis[0].type === "datetime") {
		    rows.slice(1).forEach(function (item) {
				const date = new Date(item[0]);
				const fixDate = moment.utc(Date.UTC(date.getFullYear(), date.getMonth(), date.getUTCDate(), date.getHours(), date.getMinutes(), date.getSeconds())).tz('America/La_Paz').format(dateFormat);
	      			item[0] = fixDate;
	
		    });
	    }
		return rows;
        }

        a.Chart.prototype.getChartName = function(headers) {
            let name = 'chart';
            if (headers && headers.length > 1) {
                try {
                    let aux = headers[1].trim().replace(/ /g, '-').toLowerCase();
                    if (aux.length) name = aux;
                }
                catch (err) { };
                
            } else {
                if (this.options.exporting.filename) {
                    name = this.options.exporting.filename;
                } else if (this.title) {
                    name = this.title.textStr.replace(/ /g, '-').toLowerCase();
                }
            }
            return name;
        };

        a.Chart.prototype.downloadXLSX = function () {
            if (!window.zipcelx) return;
		
            let rows = this.getDataRows_INCLAM();
            if (!rows.length) return;
            
            var div = document.createElement('div'), xlsxRows = [];
            div.style.display = 'none';
            document.body.appendChild(div);
            
            let name = 'gráfica';
            let name_completo = [];
            xlsxRows = Highcharts.map(rows.slice(1), function (row) {
                return Highcharts.map(row, function (column) {
                    return {
                        type: typeof column === 'number' ? 'number' : 'string',
                        value: column
                    };
                });
            });

            //name = this.getChartName(rows[0]);
            if (rows[0].length > 0) {
                rows[0].forEach( function (name) {
                    if (name !== "Category") {
                        name_completo.push({type:'string', value:name})
                    } else {
			name_completo.push({type:'string', value:''})
		    }
                });
                xlsxRows.unshift(name_completo);
            }
            if (name) window.zipcelx({ filename: name, sheet: { data: xlsxRows } });
        };

        a.Chart.prototype.viewData = function () { this.dataTableDiv || (this.dataTableDiv = n.createElement("div"), this.dataTableDiv.className = "highcharts-data-table", this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling)); this.dataTableDiv.innerHTML = this.getTable(); y(this, "afterViewData", this.dataTableDiv) }; a.Chart.prototype.openInCloud =
            function () {
                function b(a) { Object.keys(a).forEach(function (c) { "function" === typeof a[c] && delete a[c]; h(a[c]) && b(a[c]) }) } var c = a.merge(this.userOptions); b(c); c = { name: c.title && c.title.text || "Chart title", options: c, settings: { constructor: "Chart", dataProvider: { csv: this.getCSV() } } }; var d = JSON.stringify(c); (function () {
                    var a = n.createElement("form"); n.body.appendChild(a); a.method = "post"; a.action = "https://cloud-api.highcharts.com/openincloud"; a.target = "_blank"; var b = n.createElement("input"); b.type = "hidden"; b.name =
                        "chart"; b.value = d; a.appendChild(b); a.submit(); n.body.removeChild(a)
                })()
            }; 
            if (c = a.getOptions().exporting) 
                a.extend(c.menuItemDefinitions, 
                    { 
                        downloadCSV: { textKey: "downloadCSV", onclick: function () { this.downloadCSV() } }, 
                        downloadXLS: { textKey: "downloadXLS", onclick: function () { this.downloadXLS() } }, 
                        viewData: { textKey: "viewData", onclick: function () { this.viewData() } }, 
                        openInCloud: { textKey: "openInCloud", onclick: function () { this.openInCloud() } },
                        downloadXLSX: { textKey: "downloadXLSX", onclick: function () { this.downloadXLSX() } } 
                    }), c.buttons && c.buttons.contextButton.menuItems.push("separator", "downloadXLSX",
                /*"downloadXLS", "viewData", "openInCloud"*/); d.map && (d.map.prototype.exportKey = "name"); d.mapbubble && (d.mapbubble.prototype.exportKey = "name"); d.treemap && (d.treemap.prototype.exportKey = "name")
    }); m(b, "masters/modules/export-data.src.js", [], function () { })
});
//# sourceMappingURL=export-data.js.map