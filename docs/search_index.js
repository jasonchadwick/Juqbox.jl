var documenterSearchIndex = {"docs":
[{"location":"contents/","page":"-","title":"-","text":"","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Examples of the setup procedure can be found in the scripts in the Juqbox.jl/examples directory. The examples are invoked by, e.g.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"include(\"cnot1-setup.jl\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The following cases are included:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"rabi-setup.jl Pi-pulse (X-gate) for a qubit, i.e. a Rabi oscillator.\ncnot1-setup.jl CNOT gate for a single qudit with 4 essential and 2 guard levels. \nflux-setup.jl CNOT gate for single qubit with a flux-tuning control Hamiltonian.\ncnot2-setup.jl CNOT gate for a pair of coupled qubits with guard levels.\ncnot3-setup.jl Cross-resonance CNOT gate for a pair of qubits that are coupled by a cavity resonator.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Note: The last case reads an optimized solution from file.","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"The work flow for solving a quantum optimal control problem consists of the following general steps:","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"Setup\nOptimize\nVisualize the results","category":"page"},{"location":"workflow/#.-Setup","page":"Workflow","title":"1. Setup","text":"","category":"section"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"The setup phase includes specifying","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"The size of the state vector\nThe system and control Hamiltonians\nThe target gate transformation\nDuration of the gate and number of time steps for integrating Schroedinger's equation.","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"For the parameterization of the control functions, you need to specify","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"Carrier wave frequencies\nNumber of B-spline coefficients in each spline","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"The properties of the control problem are stored in a mutable struct that is populated by calling","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"params = Juqbox.objparams().","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"The next steps are:","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"Assign the initial parameter vector (called pcof0 in the examples below)\nSet bounds for the parameter vector to be imposed during the optimization\nAllocate working arrays by calling wa = Juqbox.Working_arrays()\nAssign convergence criteria and other parameters for the optimizer\nBuild the optimization structure by calling prob = Juqbox.setup_ipopt_problem()","category":"page"},{"location":"workflow/#.-Optimization","page":"Workflow","title":"2. Optimization","text":"","category":"section"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"Once you have been assigned the params and prob objects, as well as the initial parameter vector  pcof0, the optimizer is invoked by","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"pcof = Juqbox.run_optimizer(prob, pcof0)","category":"page"},{"location":"workflow/#.-Visualizing-the-results","page":"Workflow","title":"3. Visualizing the results","text":"","category":"section"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"General properties of the optimized solution such as trace infidelity and unitary accuracy can be evaluated,  and a number of figures can generated by invoking","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"pl = Juqbox.plot_results(params, pcof)","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"An array of Julia plot objects is returned in pl. These objects can be visualized on the screen","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"display(pl[1])","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"where pl[1] is the first Julia plot object. The following plot objects are populated by the script: ","category":"page"},{"location":"workflow/","page":"Workflow","title":"Workflow","text":"pl[1] Evolution of the state vector population\npl[2] Control functions in the rotating frame of reference\npl[3] Population of forbidden energy levels\npl[4] Lab frame control function(s)\npl[5] Fourier transform of the lab-frame control functions (linear scale)\npl[6] Fourier transform of the lab-frame control functions (log scale)\npl[7] Coefficients of the optimized parameter vector\npl[8] Convergence of the optimization","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"The following methods (functions) are exported and available by using Juqbox.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Modules = [Juqbox]\nOrder = [:function]","category":"page"},{"location":"methods/#Juqbox.assign_thresholds-Tuple{objparams,Int64,Array{Float64,1}}","page":"Methods","title":"Juqbox.assign_thresholds","text":"minCoeff, maxCoeff = assign_thresholds(params, D1, maxpar [, maxpar_unc])\n\nBuild vector of frequency independent min/max parameter constraints for each control function. Here, minCoeff = -maxCoeff.\n\nArguments\n\nparams:: objparams: Struct containing problem definition.\nD1:: Int64: Number of basis functions in each segment.\nmaxpar::Array{Float64,1}: Maximum parameter value for each coupled control.\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.assign_thresholds_ctrl_freq-Tuple{objparams,Int64,Array{Float64,2}}","page":"Methods","title":"Juqbox.assign_thresholds_ctrl_freq","text":"minCoeff, maxCoeff = assign_thresholds_ctrl_freq(params, D1, maxamp)\n\nBuild vector of parameter min/max constraints that can depend on the control function and carrier wave frequency,  with minCoeff = -maxCoeff.\n\nArguments\n\nparams:: objparams: Struct containing problem definition.\nD1:: Int64: Number of basis functions in each segment.\nmaxamp:: Matrix{Float64}: maxamp[c,f] is the maximum parameter value for ctrl c and frequency f\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.assign_thresholds_freq-Tuple{Array{Float64,1},Int64,Int64,Int64}","page":"Methods","title":"Juqbox.assign_thresholds_freq","text":"minCoeff, maxCoeff = assign_thresholds_freq(maxamp, Ncoupled, Nfreq, D1)\n\nBuild vector of frequency dependent min/max parameter constraints, with minCoeff = -maxCoeff, when there are no uncoupled control functions.\n\nArguments\n\nmaxamp::Array{Float64,1}: Maximum parameter value for each frequency\nNcoupled::Int64: Number of coupled controls in the simulation\nNfreq::Int64: Number of carrier wave frequencies used in the controls\nD1:: Int64: Number of basis functions in each control function\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.bcarrier2-Tuple{Float64,bcparams,Int64}","page":"Methods","title":"Juqbox.bcarrier2","text":"f = bcarrier2(t, params, func)\n\nEvaluate a B-spline function with carrier waves. See also the bcparams constructor.\n\nArguments\n\nt::Float64: Evaluate spline at parameter t ∈ [0, param.T]\nparam::params: Parameters for the spline\nfunc::Int64: Spline function index ∈ [0, param.Nseg-1]\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.bspline2-Tuple{Float64,splineparams,Int64}","page":"Methods","title":"Juqbox.bspline2","text":"f = bspline2(t, splineparam, splinefunc)\n\nEvaluate a B-spline function. See also the splineparams constructor.\n\nArguments\n\nt::Float64: Evaluate spline at parameter t ∈ [0, param.T]\nparam::splineparams: Parameters for the spline\nsplinefunc::Int64: Spline function index ∈ [0, param.Nseg-1]\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.calculate_timestep","page":"Methods","title":"Juqbox.calculate_timestep","text":"nsteps = calculate_timestep(T, H0, Hsym_ops, Hanti_ops, maxpar [, Pmin = 40])\n\nEstimate the number of time steps needed for the simulation, for the case without uncoupled controls.\n\nArguments\n\nT:: Float64: Final simulation\nH0::Array{Float64,2}: Time-independent part of the Hamiltonian matrix\nHsym_ops:: Array{Float64,2}: Array of symmetric control Hamiltonians\nHanti_ops:: Array{Float64,2}: Array of symmetric control Hamiltonians\nmaxpar:: Array{Float64,1}: Maximum parameter value for each subsystem\nPmin:: Int64: Number of time steps per shortest period (assuming a slowly varying Hamiltonian).\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.calculate_timestep-2","page":"Methods","title":"Juqbox.calculate_timestep","text":"nsteps = calculate_timestep(T, H0, Hsym_ops, Hanti_ops, Hunc_ops, \n                                          maxpar, max_flux[, Pmin = 40])\n\nEstimate the number of time steps needed for the simulation, when there are uncoupled controls.\n\nArguments\n\nT:: Float64: Final simulation\nH0::Array{Float64,2}: Time-independent part of the Hamiltonian matrix\nHsym_ops:: Array{Float64,2}: Array of symmetric control Hamiltonians\nHanti_ops:: Array{Float64,2}: Array of symmetric control Hamiltonians\nHunc_ops:: Array{Float64,2}: Array of uncoupled control Hamiltonians\nmaxpar:: Array{Float64,1}: Maximum parameter value for each coupled control\nmax_flux:: Array{Float64,1}: Maximum parameter value for each uncoupled control\nPmin:: Int64: Number of time steps per shortest period (assuming a slowly varying Hamiltonian).\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.calculate_timestep-3","page":"Methods","title":"Juqbox.calculate_timestep","text":"nsteps = calculate_timestep(T, H0, Hunc_ops, maxpar [, Pmin = 40])\n\nEstimate the number of time steps needed for an accurate simulation, when there are no coupled controls\n\nArguments\n\nT:: Float64: Final simulation\nH0::Array{Float64,2}: Time-independent part of the Hamiltonian matrix\nHunc_ops:: Array{Float64,2}: Array of uncoupled control Hamiltonians\nmax_unc:: Array{Float64,1}: Maximum parameter value for each subsystem (uncoupled)\nPmin:: Int64: Sample rate for accuracy (assuming a slowly varying Hamiltonian)\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.estimate_Neumann!","page":"Methods","title":"Juqbox.estimate_Neumann!","text":"estimate_Neumann!(tol, params, maxpar[, maxunc])\n\nEstimate the number of terms needed by the Neumann series approach for solving the linear system during the implicit steps of the Störmer-Verlet scheme. See also neumann!\n\nArguments\n\ntol:: Float64: Error tolerance in inverting implicit SV term\nparams:: objparams: Struct containing problem definition\nmaxpar:: Array{Float64,1}: Maximum parameter value for each coupled control\nmaxunc:: Array{Float64,1}: (optional) Maximum parameter value for each uncoupled controls\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.evalctrl-Tuple{objparams,Array{Float64,1},Array{Float64,1},Int64}","page":"Methods","title":"Juqbox.evalctrl","text":"pj [, qj] = evalctrl(params, pcof0, td, func)\n\nEvaluate the control function with index func at an array of time levels td.  \n\nNOTE: the control function index func is 1-based. \n\nNOTE: The return value(s) depend on func. For func∈[1,Ncoupled], pj, qj are returned. Otherwise,  only pj is returned, corresponding to control number func.\n\nArguments\n\nparams:: objparams: Struct with problem definition\npcof0:: Array{Float64,1}): Vector of parameter values\ntd:: Array{Float64,1}): Time values control is to be evaluated\njFunc:: Int64: Index of the control signal desired\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.gradbcarrier2!-Tuple{Float64,bcparams,Int64,Array{Float64,1}}","page":"Methods","title":"Juqbox.gradbcarrier2!","text":"gradbcarrier2!(t, params, func, g) -> g\n\nEvaluate the gradient of a control function with respect to all coefficient.\n\nNOTE: the index of the control functions is 0-based. For a set of  coupled controls, mod(func,2)=0 corresponds to ∇ pj(t) and mod(func,2) = 1  corresponds to ∇ qj(t), where j = div(func,2).\n\nArguments\n\nt::Float64: Evaluate spline at parameter t ∈ [0, param.T]\nparams::bcparams: Parameters for the spline\nfunc::Int64: Control function index ∈ [0, param.Nseg-1]\ng::Array{Float64,1}: Preallocated array to store calculated gradient\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.gradbspline2-Tuple{Float64,splineparams,Int64}","page":"Methods","title":"Juqbox.gradbspline2","text":"g = gradbspline2(t, param, splinefunc)\n\nEvaluate the gradient of a spline function with respect to all coefficient. NOTE: the index of the spline functions are 0-based. For a set of  coupled controls, mod(splinefunc,2)=0 corresponds to ∇ pj(t) and mod(splinefunc,2) = 1  corresponds to ∇ qj(t), where j = div(splinefunc,2).\n\nArguments\n\nt::Float64: Evaluate spline at parameter t ∈ [0, param.T]\nparam::splineparams: Spline parameter object\nsplinefunc::Int64: Spline function index ∈ [0, param.Nseg-1]\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.identify_forbidden_levels","page":"Methods","title":"Juqbox.identify_forbidden_levels","text":"forbiddenlev = identify_forbidden_levels(params[, custom = 0])\n\nBuild a Bool array indicating which energy levels are forbidden levels in the state vector. The forbidden levels in a state vector are defined as thos corresponding to the highest energy level in at least one of its subsystems.\n\nArguments\n\nparams:: objparams: Struct with problem definition\ncustom:: Int64: For nonzero value special stirap pulses case\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.identify_guard_levels","page":"Methods","title":"Juqbox.identify_guard_levels","text":"guardlev = identify_guard_levels(params[, custom = 0])\n\nBuild a Bool array indicating if a given energy level is a guard level in the simulation.\n\nArguments\n\nparams:: objparams: Struct with problem definition\ncustom:: Int64: A nonzero value gives a special stirap pulses case\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.initial_cond-Tuple{Any,Any}","page":"Methods","title":"Juqbox.initial_cond","text":"u_init = initial_cond(Ne, Ng)\n\nSetup a basis of canonical unit vectors that span the essential Hilbert space, setting all guard levels to zero\n\nArguments\n\nNe:: Array{Int64}: Array holding the number of essential levels in each system\nNg:: Array{Int64}: Array holding the number of guard levels in each system\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.juq2qis","page":"Methods","title":"Juqbox.juq2qis","text":"juq2qis(params, pcof, samplerate, q_ind, fileName=\"ctrl.dat\", node_loc=\"c\")\n\nEvaluate control functions and export them into a format that is readable by Qiskit.\n\nArguments\n\nparams:: objparams: Struct with problem definition\npcof:: Array{Float64,1}): Vector of parameter values\nsamplerate:: Float64: Samplerate for quantum device (number of samples per ns for the IQ mixer)\nq_ind:: Int64: Index of the control function to output (1 <= q_ind <= Nctrl*Nfreq)\nfileName:: String: Name of output file containing controls to be handled by Qiskit\nnode_loc:: String: Node location, \"c\" for cell centered, \"n\" for node-centered, default is cell-centered\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.marginalize3-Tuple{objparams,Array{Complex{Float64},3}}","page":"Methods","title":"Juqbox.marginalize3","text":"marg_prob = marginalize3(params, unitaryhist)\n\nEvaluate marginalized probabilities for the case of 3 subsystems.\n\nArguments\n\nparam:: objparams: Struct with problem definition\nunitaryhist:: Array{Complex{Float64},3}): State vector history for each timestep\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.plot_conv_hist","page":"Methods","title":"Juqbox.plot_conv_hist","text":"pconv = plot_conv_hist(params [, convname:: String=\"\"])\n\nPlot the optimization convergence history, including history of  the different terms in the objective function and the norm of the gradient.\n\nArguments\n\nparam:: objparams: Struct with problem definition\nconvname:: String: Name of plot file to be generated\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.plot_energy-Tuple{Array{Complex{Float64},3},objparams}","page":"Methods","title":"Juqbox.plot_energy","text":"plt =  plot_energy(unitaryhistory, params)\n\nPlot the evolution of the expected energy for each initial condition.\n\nArguments\n\nunitaryhistory:: Array{ComplexF64,3}: Array holding the time evolution of the state for each initial condition\nparams:: objparams: Struct with problem definition\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.plot_final_unitary-Tuple{Array{Complex{Float64},2},objparams,Float64}","page":"Methods","title":"Juqbox.plot_final_unitary","text":"plt =  plot_final_unitary(final_unitary, params)\n\nPlot the essential levels of the solution operator at a fixed time and return a plot handle\n\nArguments\n\nfinal_unitary:: Array{ComplexF64,2}: Ntot by Ness array holding the final state for each initial condition\nparams:: objparams: Struct with problem definition\nfid:: Float64: Gate fidelity (for plot title)\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.plot_results-Tuple{objparams,Array{Float64,1}}","page":"Methods","title":"Juqbox.plot_results","text":"pl = plot_results(params, pcof; [casename = \"test\", savefiles = false, samplerate = 32])\n\nCreate array of plot objects that can be visualized by, e.g., display(pl[1]).\n\nArguments\n\nparams::objparams: Object holding problem definition\npcof::Array{Float64,1}: Parameter vector\ncasename::String: Default: \"test\". String used in plot titles and in file names\nsavefiles::Bool: Default: false.Set to true to save plots on files with automatically generated filenames\nsamplerate:: Int64: Default: 32 samples per unit time (ns). Sample rate for generating plots.\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.plotspecified-Tuple{Any,Any,Array{Bool,1},Array{Bool,1}}","page":"Methods","title":"Juqbox.plotspecified","text":"plt = plotspecified(us, params, guardlev, specifiedlev)\n\nPlot the evolution of the state vector for specified levels.\n\nArguments\n\nus:: Array{Complex{Float64},3}): State vector history for each timestep\nparam:: objparams: Struct with problem definition\nguardlev:: Array{Bool,1}): Boolean array indicating if a certain level is a guard level\nspecifiedlev:: Array{Bool,1}: Boolean array indicating which levels to be plotted\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.plotunitary-Tuple{Any,Any,Any}","page":"Methods","title":"Juqbox.plotunitary","text":"plt = plotunitary(us, params, guardlev)\n\nPlot the evolution of the state vector.\n\nArguments\n\nus:: Array{Complex{Float64},3}): State vector history for each timestep\nparam:: objparams: Struct with problem definition\nguardlev:: Array{Bool,1}): Boolean array indicating if a certain level is a guard level\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.read_pcof-Tuple{String}","page":"Methods","title":"Juqbox.read_pcof","text":"pcof = read_pcof(refFileName)\n\nRead the parameter vector pcof from a JLD2 formatted file\n\nArguments\n\nrefFileName: String holding the name of the file.\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.run_optimizer","page":"Methods","title":"Juqbox.run_optimizer","text":"pcof = run_optimizer(prob, pcof0 [, baseName:: String=\"\"])\n\nCall IPOPT to  optimizize the control functions.\n\nArguments\n\nprob:: IpoptProblem: Struct containing Ipopt parameters callback functions\npcof0:: Array{Float64, 1}: Initial guess for the parameter values\nbaseName:: String: Name of file for saving the optimized parameters; extension \".jld2\" is appended\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.save_pcof-Tuple{String,Array{Float64,1}}","page":"Methods","title":"Juqbox.save_pcof","text":"save_pcof(refFileName, pcof)\n\nSave the parameter vector pcof on a JLD2 formatted file with handle pcof\n\nArguments\n\nrefFileName: String holding the name of the file.\npcof: Vector of floats holding the parameters.\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.setup_ipopt_problem-Tuple{objparams,Working_Arrays,Int64,Array{Float64,1},Array{Float64,1}}","page":"Methods","title":"Juqbox.setup_ipopt_problem","text":"prob = setup_ipopt_problem(params, wa, nCoeff, minCoeff, maxCoeff; maxIter=50, \n                        lbfgsMax=10, startFromScratch=true, ipTol=1e-5, acceptTol=1e-5, acceptIter=15,\n                        nodes=[0.0], weights=[1.0])\n\nSetup structure containing callback functions and convergence criteria for  optimization via IPOPT. Note the last two inputs, nodes', andweights', are to be used when performing a simple risk-neutral optimization where the fundamental frequency is random.\n\nArguments\n\nparams:: objparams: Struct with problem definition\nwa::Working_Arrays: Struct containing preallocated working arrays\nnCoeff:: Int64: Number of parameters in optimization\nminCoeff:: Array{Float64, 1}: Minimum allowable value for each parameter\nmaxCoeff:: Array{Float64, 1}: Maximum allowable value for each parameter\nmaxIter:: Int64: Maximum number of iterations to be taken by optimizer (keyword arg)\nlbfgsMax:: Int64: Maximum number of past iterates for Hessian approximation by L-BFGS (keyword arg)\nstartFromScratch:: Bool: Specify whether the optimization is starting from file or not (keyword arg)\nipTol:: Float64: Desired convergence tolerance (relative) (keyword arg)\nacceptTol:: Float64: Acceptable convergence tolerance (relative) (keyword arg)\nacceptIter:: Int64: Number of acceptable iterates before triggering termination (keyword arg)\nnodes:: Array{Float64, 1}: Risk-neutral opt: User specified quadrature nodes on the interval [-ϵ,ϵ] for some ϵ (keyword arg)\nweights:: Array{Float64, 1}: Risk-neutral opt: User specified quadrature weights on the interval [-ϵ,ϵ] for some ϵ (keyword arg)\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.setup_rotmatrices-Tuple{Array{Int64,1},Array{Int64,1},Array{Float64,N} where N}","page":"Methods","title":"Juqbox.setup_rotmatrices","text":"omega1[, omega2, omega3] = setup_rotmatrices(Ne, Ng, fund_freq)\n\nBuild diagonal rotation matrices based on the |0⟩to |1⟩ transition frequency in each sub-system.\n\nArguments\n\nNe::Array{Int64,1}: Number of essential energy levels for each subsystem\nNg::Array{Int64,1}: Number of guard energy levels for each subsystem\nfund_freq::Array{Float64}: Transitions frequency [GHz] for each subsystem\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.traceobjgrad","page":"Methods","title":"Juqbox.traceobjgrad","text":"objf = traceobjgrad(pcof0, params, wa[, verbose = false, evaladjoint = true])\n\nPerform a forward and/or adjoint Schrödinger solve to evaluate the objective function and/or gradient.\n\nArguments\n\npcof0::Array{Float64,1}: Array of parameter values defining the controls\nparam::objparams: Struct with problem definition\nwa::Working_Arrays: Struct containing preallocated working arrays\nverbose::Bool = false: Run simulation with additional terminal output and store state history.\nevaladjoint::Bool = true: Solve the adjoint equation and calculate the gradient of the objective function.\n\n\n\n\n\n","category":"function"},{"location":"methods/#Juqbox.wmatsetup-Tuple{Array{Int64,1},Array{Int64,1}}","page":"Methods","title":"Juqbox.wmatsetup","text":"wmat = wmatsetup(Ne, Ng)\n\nBuild the default positive semi-definite weighting matrix W to calculate the  leakage into higher energy forbidden states\n\nArguments\n\nNe::Array{Int64,1}: Number of essential energy levels for each subsystem\nNg::Array{Int64,1}: Number of guard energy levels for each subsystem\n\n\n\n\n\n","category":"method"},{"location":"methods/#Juqbox.zero_start_end!-Tuple{objparams,Int64,Array{Float64,1},Array{Float64,1}}","page":"Methods","title":"Juqbox.zero_start_end!","text":"zero_start_end!(params, D1, minCoeff, maxCoeff)\n\nForce the control functions to start and end at zero by setting zero bounds for the first two and last  two parameters in each B-spline segment.\n\nArguments\n\nparams:: objparams: Struct containing problem definition.\nD1:: Int64: Number of basis functions in each segment.\nminCoeff:: Vector{Float64}: Lower parameter bounds to be modified\nmaxCoeff:: Vector{Float64}: Upper parameter bounds to be modified\n\n\n\n\n\n","category":"method"},{"location":"installation/","page":"-","title":"-","text":"The following instructions assume that you have already installed Julia (currently version 1.6.3) on your system. Before proceeding, we recommend that you add the following lines to the file ~/.julia/config/startup.jl. You may have to first create the config folder under .julia in your home directory. Then add the following lines to the startup.jl file:","category":"page"},{"location":"installation/","page":"-","title":"-","text":"ENV[\"JULIA_PROJECT\"]=\"@.\"\nENV[\"PLOTSDEFAULTBACKEND\"]=\"PyPlot\"","category":"page"},{"location":"installation/","page":"-","title":"-","text":"These are environment variables. The first one tells Julia to look for Project.toml files in your current or parent directory. The second one specifies the backend for plotting. Most of the examples in this document uses the PyPlot backend, which assumes that you have installed that package. If you have trouble installing PyPlot, you can instead install the \"GR\" package and set the default backend to \"GR\".","category":"page"},{"location":"installation/","page":"-","title":"-","text":"Start julia and type ] to enter the package manager. Then do:","category":"page"},{"location":"installation/","page":"-","title":"-","text":"(@v1.6) pkg> add  https://github.com/LLNL/Juqbox.jl.git\n(@v1.6) pkg> precompile\n(@v1.6) pkg> test Juqbox\n... all tests should pass ...","category":"page"},{"location":"installation/","page":"-","title":"-","text":"To exit the package manager you type <DEL>, and to exit julia you type exit().","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Control functions)","category":"page"},{"location":"#Juqbox.jl","page":"Home","title":"Juqbox.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Juqbox.jl is a package for solving quantum optimal control problems in closed quantum systems, where the evolution of the state vector is governed by Schroedinger's equation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The main features of Juqbox include","category":"page"},{"location":"","page":"Home","title":"Home","text":"Symplectic time integration of Schroedinger's equation using the Stormer-Verlet scheme.\nEfficient parameterization of the control functions using B-splines with carrier waves.\nObjective function includes target gate infidelity and occupation of guarded (forbidden) states.\nExact computation of the gradient of the objective function by solving the discrete adjoint equation.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The numerical methods in Juqbox.jl are documented in these papers:","category":"page"},{"location":"","page":"Home","title":"Home","text":"N. A. Petersson and F. M. Garcia, \"Optimal Control of Closed Quantum Systems via B-Splines with Carrier Waves\", LLNL-JRNL-823853, arXiv:2106.14310.\nN. A. Petersson, F. M. Garcia, A. E. Copeland, Y. L. Rydin and J. L. DuBois, “Discrete Adjoints for Accurate Numerical Optimization with Application to Quantum Control”, LLNL-JRNL-800457, arXiv:2001.01013.","category":"page"},{"location":"function-index/","page":"Index","title":"Index","text":"Modules = [Juqbox]","category":"page"},{"location":"types/","page":"Types","title":"Types","text":"The following types are exported and available by using Juqbox.","category":"page"},{"location":"types/","page":"Types","title":"Types","text":"Modules = [Juqbox]\nOrder = [:type]","category":"page"},{"location":"types/#Juqbox.Working_Arrays","page":"Types","title":"Juqbox.Working_Arrays","text":"wa = Working_Arrays(params::objparams, nCoeff::Int64)\n\nConstructor for the mutable struct Working_Arrays containing preallocated working arrays.\n\nArguments\n\nparam:: objparams: Struct with problem definition\nnCoeff:: Int64: Number of parameters in optimization\n\n\n\n\n\n","category":"type"},{"location":"types/#Juqbox.bcparams","page":"Types","title":"Juqbox.bcparams","text":"bcpar = bcparams(T, D1, Ncoupled, Nunc, omega, pcof)\n\nGeneral constructor of struct bcparams for setting up B-splines with carrier waves.\n\nbcpar = bcparams(T, D1, omega, pcof)\n\nSimplified constructor for the case when there are no uncoupled controls and Ncoupled = size(omega,1).\n\nArguments\n\nT:: Float64: Duration of spline function\nD1:: Int64: Number of basis functions in each segment\nNcoupled::Int64: Number of coupled controls in the simulation\nNunc::Int64: Number of uncoupled controls in the simulation\nomega::Array{Float64,2}: Carrier wave frequencies\npcof:: Array{Float64, 1}: Coefficient vector. Must have D1*Nseg elements\n\nFirst dimensions of the omega array:\n\nWithout uncoupled controls, Nunc=0 and size(omega,1) = Ncoupled.\nWith uncoupled controls, Nunc > 0 and size(omega,1) = Ncoupled + Nunc.\n\nSecond dimension of the omega array:\n\nsize(omega, 2) = Nfreq\n\nOrdering of the pcof array:\n\nFirst consider the case without uncoupled control functions, Nunc = 0:  Then the pcof array then has 2*Ncoupled*Nfreq*D1 elements.  Each ctrl ∈ [1,Ncoupled] and freq ∈ [1,Nfreq] corresponds to D1 elements in  the pcof vector. For the case Ncoupled = 2 and Nfreq = 2, the elements are ordered according to\n\nctrl freq α_1 α_2\n1 1 1:D1 D1+1:2 D1\n1 2 2 D1+1: 3 D1 3 D1+1:4 D1\n2 1 4 D1+1: 5 D1 5 D1+1:6 D1\n2 2 6 D1+1: 7 D1 7 D1+1: 8D1\n\nIf there are uncoupled controls, Nunc > 0, the pcof array should have (2*Ncoupled + Nunc)*Nfreq*D1 elements.  The last Nunc*Nfreq*D1 elements correspond to the uncoupled control functions and are ordered in a corresponding way.\n\nExternal links\n\nSpline Wavelet on Wikipedia.\n\n\n\n\n\n","category":"type"},{"location":"types/#Juqbox.objparams","page":"Types","title":"Juqbox.objparams","text":"params = objparams(Ne, Ng, T, Nsteps;\n                    Uinit=Uinit, \n                    Utarget=Utarget,\n                    Cfreq=Cfreq, \n                    Rfreq=Rfreq, \n                    Hconst=Hconst [, \n                    Hsym_ops=Hsym_ops,\n                    Hanti_ops=Hanti_ops, \n                    Hunc_ops=Hunc_ops,\n                    wmatScale=wmatScale, \n                    use_sparse=use_sparse])\n\nConstructor for the mutable struct objparams. The sizes of the arrays in the argument list are based on Ntot = prod(Ne + Ng), Ness = prod(Ne), Nosc = length(Ne) = length(Ng).\n\nNotes: It is assumed that length(Hsym_ops) = length(Hanti_ops) =: Ncoupled. The matrices Hconst, Hsym_ops[j]and Hanti_ops[j], for j∈[1,Ncoupled], must all be of size Ntot × Ntot. The matrices Hsym_ops[j] must be symmetric and Hanti_ops[j] must be skew-symmetric. The matrices Hunc_ops[j], for j∈[1,Nunc], where Nunc = length(Hunc_ops), must also be of size Ntot × Ntot and either be symmetric or skew-symmetric.\n\nArguments\n\nNe::Array{Int64,1}: Number of essential energy levels for each subsystem\nNg::Array{Int64,1}: Number of guard energy levels for each subsystem\nT::Float64: Duration of gate\nNsteps::Int64: Number of timesteps for integrating Schroedinger's equation\nUinit::Array{Float64,2}: (keyword) Matrix holding the initial conditions for the solution matrix of size Uinit[Ntot, Ness]\nUtarget::Array{Complex{Float64},2}: (keyword) Matrix holding the target gate matrix of size Uinit[Ntot, Ness]\nCfreq::Array{Float64,2}: (keyword) Carrier wave (angular) frequencies of size Cfreq[Nctrl, Nfreq]\nRfreq::Array{Float64,1}: (keyword) Rotational (regular) frequencies for each control Hamiltonian; size Rfreq[Nctrl]\nHconst::Array{Float64,2}: (keyword) Time-independent part of the Hamiltonian matrix of size Ntot × Ntot\nHsym_ops:: Array{Array{Float64,2},1}: (keyword) Array of symmetric control Hamiltonians, each of size Ntot × Ntot\nHanti_ops:: Array{Array{Float64,2},1}: (keyword) Array of anti-symmetric control Hamiltonians, each of size Ntot × Ntot\nHunc_ops:: Array{Array{Float64,2},1}: (keyword) Array of uncoupled control Hamiltonians, each of size Ntot × Ntot\nwmatScale::Float64 = 1.0: (keyword) Scaling factor for suppressing guarded energy levels\nuse_sparse::Bool = false: (keyword) Set to true to sparsify all Hamiltonian matrices\n\n\n\n\n\n","category":"type"},{"location":"types/#Juqbox.splineparams","page":"Types","title":"Juqbox.splineparams","text":"spar = splineparams(T, D1, Nseg, pcof)\n\nConstructor for struct splineparams, which sets up the parameters for a regular B-spline function (without carrier waves).\n\nArguments\n\nT:: Float64: Duration of spline function\nD1:: Int64: Number of basis functions in each spline\nNseg:: Int64:  Number of splines (real, imaginary, different ctrl func)\npcof:: Array{Float64, 1}: Coefficient vector. Must have D1*Nseg elements\n\nExternal links\n\nSpline Wavelet on Wikipedia.\n\n\n\n\n\n","category":"type"}]
}
