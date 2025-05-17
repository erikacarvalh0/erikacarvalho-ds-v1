export const printCss = `
@page { size: auto;  margin: 0mm; }

@font-face {
	font-family: "Josefin Sans";
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src: url(https://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XXME.ttf) format("truetype");
}
@font-face {
	font-family: "Nunito";
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: url(https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM.ttf) format("truetype");
}

body {
	padding: 24px;
}

* {
	font-family: 'Nunito', sans-serif;
	font-size: 16px;
}

header p {
	font-family: 'Josefin sans', sans-serif;
	font-size: 20px;
	text-transform: uppercase;
	font-weight: 700;
}

p {
	margin: 0;
}

ul {
	list-style: none;
	padding: 0;
}

li {
	display: flex;
	align-items: flex-start;
	margin-top: 8px;
	padding-left: 8px;
}

li:before {
	content: '•';
	margin-right: 8px;
	color: #58C9D4;
  }

button {
	display: none;
}

`