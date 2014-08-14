    //Number Slider stuff
        var tbl, rows, cols;

        function Move(d) {
            //Get the td
            var cell = GetCell(d);
            var row = GetRow(cell);
            var ri = row.rowIndex;
            var ci = cell.cellIndex;
            var emptycell;

            if (ri > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri - 1].cells[ci])) { emptycell = tbl.rows[ri - 1].cells[ci]; }
            }
            if (ri < tbl.rows.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri + 1].cells[ci])) { emptycell = tbl.rows[ri + 1].cells[ci]; }
            }
            if (ci > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci - 1])) { emptycell = tbl.rows[ri].cells[ci - 1]; }
            }
            if (ci < row.cells.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci + 1])) { emptycell = tbl.rows[ri].cells[ci + 1]; }
            }

            if (emptycell == null) {
                d.style.backgroundColor = "#FF3300";
                d.style.color = "#FFFFFF";
                setTimeout("RemoveHighlight('" + d.id + "');", 500);
            }
            else {
                ChangeParent(d, emptycell);
                IsInOrder();
            }
        }

        function IsInOrder() {
            var arrDiv = document.getElementsByTagName("DIV");
            var inorder = true;
            for (var i = 0; i < arrDiv.length - 1; i++) {
                var n = parseInt(trim(arrDiv[i].innerHTML));
                var n1 = parseInt(trim(arrDiv[i + 1].innerHTML));
                if (n + 1 != n1) {
                    inorder = false;
                    break;
                }
            }
            if (inorder && IsCellEmpty(tbl.rows[tbl.rows.length - 1].cells[cols - 1])) {
                for (var i = 0; i < arrDiv.length; i++) {
                    arrDiv[i].style.backgroundColor = "#FFFFCC";
                }
            }
        }

        function Reset() {

            rows = 4
            cols = 4

            tbl = document.getElementById("tbl");
            while (tbl.rows.length > 0) {
                tbl.deleteRow(0);
            }
            var n = (rows * cols) - 1;
            var arrN = new Array();
            for (var i = 1; i <= n; i++) {
                arrN.push(i);
            }
            var inversions = 1;

            while (inversions % 2 == 1) {
                arrN = Shuffle(arrN);
                //Be an asshole and make sure this isn't solvable
                //http://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html

                inversions = 0;
                for (var i = 0; i < arrN.length; i++) {
                    for (var j = i; j < arrN.length; j++) {
                        if (arrN[i] > arrN[j])
                            inversions = inversions + .5;   //inversions++; would check for solvability (this does opposite)
                    }
                }
            }

            n = 0;
            for (var i = 0; i < rows; i++) {
                tbl.insertRow(i);
                var tr = tbl.rows[i];
                for (var j = 0; j < cols; j++) {
                    tr.insertCell(j);
                    var td = tr.cells[j];
                    td.className = "cell";
                    if (i == rows - 1 && j == cols - 1)
                        td.innerHTML = "";
                    else
                        td.innerHTML = "<div id='n" + arrN[n] + "' class='num' onclick='Move(this)'>" + arrN[n] + "</div>";

                    n++;
                }
            }
        }

        function Shuffle(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        function IsCellEmpty(cell) {
            for (var i = 0; i < cell.childNodes.length; i++) {
                if (cell.childNodes[i].className == "num") {
                    return false;
                }
            }
            return true;
        }

        function RemoveHighlight(did) {
            var d = document.getElementById(did);
            d.style.backgroundColor = "#CCFFFF";
            d.style.color = "#0099FF";
        }

        function GetTable(a) {
            var c = a.parentNode;
            while (c.tagName != 'TABLE') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRow(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c;
        }

        function GetCell(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRowIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c.rowIndex;
        }

        function GetCellIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c.cellIndex;
        }

        function AddRow(tbl, i, NumCells) {
            var r = tbl.insertRow(i);
            for (j = 0; j < NumCells; j++) {
                var c = r.insertCell(j);
                c.className = "col" + (j + 1);
                c.innerHTML = "";
            }
        }

        function trim(str) {
            str = str.replace(/^\s+/, '');
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        }

        function ChangeParent(sourceElement, targetElement) {
            var sourceElementParent = sourceElement.parentNode;
            sourceElementParent.removeChild(sourceElement);
            targetElement.appendChild(sourceElement);
        }