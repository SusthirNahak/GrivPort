export default function SignIn() {
	return (
	  <div className="h-screen flex flex-col justify-between bg-gray-100">
		{/* Upper Half */}
		<div className="relative flex-1">
		  {/* Background Image */}
		  <div
			className="absolute inset-0 bg-cover bg-center"
			style={{
			  backgroundImage:
				"url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
			  filter: 'brightness(0.5)',
			}}
		  ></div>
  
		  {/* Curved Header */}
		  <div className="relative z-10 bg-amber-100 rounded-b-[50px] p-6 text-center">
			<div className="w-10 h-2 bg-orange-500 rounded-full mx-auto mb-2"></div>
			<h2 className="text-sm text-orange-700 font-semibold">Welcome to</h2>
			<h1 className="text-xl font-bold text-gray-800">Pazzi per la pasta</h1>
			<p className="text-sm text-gray-600 mt-1">
			  New fresh pasta recipes every day!
			</p>
		  </div>
		</div>
  
		{/* Lower Half */}
		<div className="flex-1 flex items-end p-6">
		  <div className="w-full space-y-3">
			<button className="w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg">
			  Sign up
			</button>
			<button className="w-full py-3 bg-white text-gray-800 border border-gray-300 font-bold rounded-lg shadow">
			  Log in
			</button>
		  </div>
		</div>
	  </div>
	);
  }
  

  clipPath:
  'path("M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,197.3C960,192,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z")',
WebkitClipPath:
  'path("M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,197.3C960,192,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z")',


  <svg width="0" height="0">
  <defs>
	<clipPath id="curve-clip" clipPathUnits="objectBoundingBox">
	  <path d="M0,0.4 C0.25,0.5,0.75,0.3,1,0.4 L1,1 L0,1 Z" />
	</clipPath>
  </defs>
</svg>

{/* Background Image Extending to Upper Part */}
<div
  className="absolute inset-0 -top-20 w-full h-full bg-cover bg-center"
  style={{
	backgroundImage:
	  "url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
	filter: 'brightness(0.5)',
	clipPath: 'url(#curve-clip)',
	WebkitClipPath: 'url(#curve-clip)',
	backgroundSize: 'cover', // Cover the whole area
	backgroundRepeat: 'no-repeat',
  }}
></div>