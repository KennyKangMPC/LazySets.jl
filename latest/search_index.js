var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#LazySets.jl-1",
    "page": "Home",
    "title": "LazySets.jl",
    "category": "section",
    "text": "DocTestFilters = [r\"[0-9\\.]+ seconds \\(.*\\)\"]\nCurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\n    using Compat.SparseArrays, Compat.LinearAlgebra\nendLazySets is a Julia package for calculus with convex sets.The aim is to provide a scalable library for solving complex set-based problems, such as those encountered in differential inclusions or reachability analysis techniques in the domain of formal verification. Typically, one is confronted with a set-based recurrence with a given initial set and/or input sets, and for visualization purposes the final result has to be obtained through an adequate projection onto low-dimensions. This library implements types to construct set formulas and methods to efficiently and accurately approximate the projection in low-dimensions.Pages = [\"index.md\"]"
},

{
    "location": "index.html#Introduction-1",
    "page": "Home",
    "title": "Introduction",
    "category": "section",
    "text": "In this package we describe convex sets lazily (i.e., symbolically). This way we provide an exact but abstract representation, in principle for any common convex set class or operation between sets. Concrete information is obtained through evaluating the set in specific directions. More precisely, each concrete subtype mathcalX of the abstract type LazySet exports a method to calculate its support vector σ(d mathcalX) in a given (arbitrary) direction d in mathbbR^n. Representing sets exactly but lazily has the advantage of being able to perform only the required operations on-demand.For very long sequences of computations (e.g., set-based recurrences with tens of thousands of elements), it is useful to combine both lazy and concrete representations such as polyhedral approximations. All this is easy to do with LazySets. Moreover, we provide a specialized module for handling Cartesian decomposition of two-dimensional projections. The projection can be taken to the desired precision using an iterative refinement method."
},

{
    "location": "index.html#Example-1",
    "page": "Home",
    "title": "Example",
    "category": "section",
    "text": "Let mathcalX_0 subset mathbbR^1000 be the Euclidean ball of center (1 ldots 1) and radius 01 in dimension n=1000. Given a real matrix A in mathbbR^1000 times 1000, suppose that we are interested in the equationmathcalY = CH(e^A δ mathcalX_0  δ BmathcalU mathcalX_0)where CH is the convex hull operator,  denotes Minkowski sum, mathcalU is a ball in the infinity norm centered at zero and radius 12, and B is a linear map of the appropriate dimensions. This equation typically arises in the study of discrete approximation models for reachability of continuous systems, see for example SpaceEx: Scalable verification of hybrid systems.For concreteness, we take A to be a random matrix with probability 1 of any entry being nonzero. Suppose that the input set mathcalU is two-dimensional, and that the linear map B is random. Finally, let δ = 0.1. Using LazySets, we can define this problem as follows:julia> A = sprandn(1000, 1000, 0.01);\n\njulia> δ = 0.1;\n\njulia> X0 = Ball2(ones(1000), 0.1);\n\njulia> B = randn(1000, 2);\n\njulia> U = BallInf(zeros(2), 1.2);\nThe @time macro shows that building mathcalY with LazySets is instantaneous.julia> Y = CH(SparseMatrixExp(A * δ) * X0 + δ * B * U, X0);By asking for the concrete type of Y, we see that it has a convex hull type, parameterized by the types of its arguments, corresponding to the mathematical formulation:julia> typeof(Y)\nConvexHull{Float64,MinkowskiSum{Float64,ExponentialMap{Float64,Ball2{Float64}},LinearMap{Float64,BallInf{Float64},Float64,Array{Float64,2}}},Ball2{Float64}}Now suppose that we are interested in observing the projection of mathcalY onto the variables number 1 and 500. First we define the 21000 projection matrix and apply it to mathcalY as a linear map (i.e., from the left). Second, we use the overapproximate method:julia> proj_mat = [[1. zeros(1, 999)]; [zeros(1, 499) 1. zeros(1, 500)]];\n\njulia> res = Approximations.overapproximate(proj_mat * Y);We have calculated a box overapproximation of the exact projection onto the (x_1 x_500) plane. Notice that it takes about 0.064 seconds for the whole operation, allocating less than 10MB of RAM. Let us note that if the set operations were done explicitly, this would be much (!) slower. For instance, already the explicit computation of the matrix exponential would have cost 10x more, and allocated around 300MB. For even higher n, an evaluation will probably run out of RAM. But this is doable with LazySets because the action of the matrix exponential on the set is only evaluated along the directions of interest. Similar comments apply to the Minkowski sum above.We can visualize the result using plot, as shown below (left-most plot).(Image: assets/example_ch.png)In the second and third plots, we have used a refined method that allows to specify a prescribed accuracy for the projection (in terms of the Hausdorff distance). For the theoretical background, see this reference. It can be passed as a second argument to overapproximate.Error tol. time (s) memory (MB)\n∞ (no refinement) 0.022 5.27\n1e-1 0.051 7.91\n1e-3 0.17 30.3This table shows the runtime and memory consumption for different error tolerances, and the results are shown in three plots of above, from left to right. When passing to a smaller tolerance, the corners connecting edges are more \"rounded\", at the expense of computational resources, since more support vectors have to be evaluated."
},

{
    "location": "index.html#Features-1",
    "page": "Home",
    "title": "Features",
    "category": "section",
    "text": "The core functionality of LazySets is:Lazy (i.e., symbolic) types for several classes of convex sets such as balls in different norms, polygons in constraint or vertex representation, zonotopes, special types such as lines and linear constraints, hyperrectangles, and high-dimensional polyhedra.\nLazy implementations for most commonly used set operations, e.g., Minkowski sum, Cartesian product, convex hull and interval hull approximations, and linear and exponential maps.On top of the previous basic type representations and operations, LazySets can be used to:Efficiently evaluate the support vector of nested lazy sets.\nCartesian decomposition of lazy sets using two-dimensional projections.\nFast overapproximation of an exact set using a polyhedral approximation, to the desired accuracy.\nExtensive visualization capabilities through the Plots.jl framework."
},

{
    "location": "index.html#Manual-Outline-1",
    "page": "Home",
    "title": "Manual Outline",
    "category": "section",
    "text": "Pages = [\n    \"man/getting_started.md\",\n    \"man/polyhedral_approximations.md\",\n    \"man/decompose_example.md\",\n    \"man/fast_2d_LPs.md\",\n    \"man/iterative_refinement.md\",\n    \"man/interval_hulls.md\",\n    \"man/convex_hulls.md\",\n    \"man/reach_zonotopes.md\",\n    \"man/reach_zonotopes_hybrid.md\",\n    \"man/concrete_polyhedra.md\"\n]\nDepth = 2"
},

{
    "location": "index.html#Library-Outline-1",
    "page": "Home",
    "title": "Library Outline",
    "category": "section",
    "text": "Pages = [\n    \"lib/interfaces.md\",\n    \"lib/representations.md\",\n    \"lib/operations.md\",\n    \"lib/conversion.md\",\n    \"lib/approximations.md\",\n    \"lib/utils.md\"\n]\nDepth = 2"
},

{
    "location": "man/getting_started.html#",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "man/getting_started.html#Getting-Started-1",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "section",
    "text": "In this section we review the recommended setup to start working with this package.Pages = [\"getting_started.md\"]"
},

{
    "location": "man/getting_started.html#Setup-1",
    "page": "Getting Started",
    "title": "Setup",
    "category": "section",
    "text": "This package requires Julia v0.6 or later. Refer to the official documentation on how to install it for your system. Below we explain the steps for setting up LazySets on your system and checking that it builds correctly."
},

{
    "location": "man/getting_started.html#Installation-1",
    "page": "Getting Started",
    "title": "Installation",
    "category": "section",
    "text": "To install LazySets, use the following command inside Julia\'s REPL:Pkg.clone(\"https://github.com/JuliaReach/LazySets.jl\")The dependencies of LazySets, such as Expokit.jl – which provides lazy matrix exponentiation routines – are automatically installed through Julia\'s package manager. The full list of dependencies is specified in the REQUIRE file."
},

{
    "location": "man/getting_started.html#Workflow-tips-1",
    "page": "Getting Started",
    "title": "Workflow tips",
    "category": "section",
    "text": "There are different ways to use Julia: from the terminal, from the Julia REPL, from IJulia (i.e., Jupyter notebook), from Juno, etc. If you do not have a preferred choice, we recommend using LazySets through IJulia; one reason is that the visualization is conveniently embedded into the notebook, and it can be exported into different formats, among other benefits. On the other hand, for development purposes you probably want to use the REPL or the Juno environment."
},

{
    "location": "man/getting_started.html#Updating-1",
    "page": "Getting Started",
    "title": "Updating",
    "category": "section",
    "text": "After working with LazySets for some time, you may want to get the newest version. For this you can use the following command (e.g., from the REPL):Pkg.checkout(\"LazySets\")That will check out the latest version in the master branch, and precompile it the next time you enter a session and execute using LazySets."
},

{
    "location": "man/polyhedral_approximations.html#",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral Approximations",
    "category": "page",
    "text": ""
},

{
    "location": "man/polyhedral_approximations.html#Polyhedral-Approximations-1",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral Approximations",
    "category": "section",
    "text": "In this section we review the mathematical notation and results from convex geometry that are used throughout LazySets.Pages = [\"polyhedral_approximations.md\"]\nDepth = 3"
},

{
    "location": "man/polyhedral_approximations.html#Preliminaries-1",
    "page": "Polyhedral Approximations",
    "title": "Preliminaries",
    "category": "section",
    "text": "Let us introduce some notation. Let mathbbI_n be the identity matrix of dimension ntimes n. For p geq 1, the p-norm of an n-dimensional vector x in mathbbR^n is denoted Vert x Vert_p."
},

{
    "location": "man/polyhedral_approximations.html#Support-Function-1",
    "page": "Polyhedral Approximations",
    "title": "Support Function",
    "category": "section",
    "text": "The support function is a basic notion for approximating convex sets. Let mathcalX subset mathbbR^n be a compact convex set. The support function of mathcalX is the function rho_mathcalX  mathbbR^nto mathbbR, defined asrho_mathcalX(ell) = maxlimits_x in mathcalX ell^mathrmT xWe recall the following elementary properties of the support function.Proposition. For all compact convex sets mathcalX, mathcalY in mathbbR^n, for all ntimes n real matrices M, all scalars lambda, and all vectors ell in mathbbR^n, we have:beginalign*\nquad rho_lambdamathcalX (ell) = rho_mathcalX (lambda ell)\ntext and  rho_lambdamathcalX (ell) = lambda rho_mathcalX (ell) text if  lambda  0 tag11 1mm\n\nquad rho_MmathcalX (ell) = rho_mathcalX (M^mathrmT ell) tag12 1mm\n\nquad rho_mathcalX oplus mathcalY (ell) = rho_mathcalX (ell) + rho_mathcalY (ell) tag13 1mm\n\nquad rho_mathcalX times mathcalY (ell) = ell^mathrmT sigma_mathcalX times mathcalY(ell) = rho_mathcalX(ell_1^mathrmT) + rho_mathcalY(ell_2^mathrmT) tag14 1mm\n\nquad rho_mathrmCH(mathcalXcupmathcalY) (ell) = max (rho_mathcalX (ell) rho_mathcalY (ell)) tag15\nendalign*"
},

{
    "location": "man/polyhedral_approximations.html#Support-Vector-1",
    "page": "Polyhedral Approximations",
    "title": "Support Vector",
    "category": "section",
    "text": "The farthest points of mathcalX in the direction ell are the support vectors denoted sigma_mathcalX(ell). These points correspond to the optimal points for the support function, i.e.,sigma_mathcalX(ell) =  x in mathcalX  ell^mathrmT x  = rho_mathcalX(ell)  Since all support vectors in a given direction evaluate to the same value of the support function, we often speak of the support vector, where the choice of any support vector is implied.(Image: Illustration of the support function and the support vector)Proposition 2. Under the same conditions as in Proposition 1, the following hold:beginalign*\nquad sigma_lambdamathcalX (ell) = lambda sigma_mathcalX (lambda ell) tag21 1mm\n\nquad sigma_MmathcalX (ell) = Msigma_mathcalX (M^mathrmT ell) tag22 1mm\n\nquad sigma_mathcalX oplus mathcalY (ell) = sigma_mathcalX (ell) oplus sigma_mathcalY (ell) tag23 1mm\n\nquad sigma_mathcalX times mathcalY (ell) = (sigma_mathcalX(ell_1) sigma_mathcalY(ell_2)) text where  ell = (ell_1 ell_2) tag24 1mm\n\nquad sigma_mathrmCH(mathcalXcupmathcalY) (ell) =\ntextargmax_x y (ell^mathrmT x ell^mathrmT y)\ntext where  x in sigma_mathcalX(ell) y in sigma_mathcalY(ell) tag25\nendalign*"
},

{
    "location": "man/polyhedral_approximations.html#Polyhedral-approximation-of-a-convex-set-1",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral approximation of a convex set",
    "category": "section",
    "text": "The projection of a set into a low dimensional space (a special case of M mathcalX) can be conveniently evaluated using support functions, since sigma_MmathcalX(ell) = sigma_mathcalX(M^Tell). Moreover, for some classical convex sets such as unit balls in the infinity norm, in the 2-norm, or polyhedra in constraint representation, the support functions can be efficiently computed. For example, the support function of the unit ball mathcalB_p^n is rho_mathcalB_p^n(ell) = VertellVert_fracpp-1Given directions ell_1ldotsell_m, a tight overapproximation of mathcalX is the outer polyhedron given by the constraintsbeginequation*\nquad bigwedge_i ell_i^T x leq rho_mathcalX(ell_i) tag3\nendequation*For instance, a bounding box involves evaluating the support function in 2n directions. To quantify this, we use the following distance measure.A set mathcalhatX is within Hausdorff distance varepsilon of mathcalX if and only ifmathcalhatX subseteq mathcalX oplus varepsilonmathcalB_p^n\ntext and  mathcalX subseteq mathcalhatX oplus\nvarepsilonmathcalB_p^nThe infimum varepsilon geq 0 that satisfies the above equation is called the Hausdorff distance between mathcalX and mathcalhatX with respect to the p-norm, and is denoted d_H^pbigl(mathcalXmathcalhatXbigr).Another useful characterization of the Hausdorff distance is the following. Let mathcalX mathcalY subset mathbbR^n be polytopes. Thend^p_H(mathcalX mathcalY) = max_ell in mathcalB_p^n\nleftrho_mathcalY(ell) - rho_mathcalX(ell)rightIn the special case mathcalX subseteq mathcalY, the absolute value can be removed.By adding directions using Lotov\'s method (s. below), the outer polyhedron in (3) is within Hausdorff distance varepsilon VertXVert_p for mathcalOleft(frac1varepsilon^n-1right) directions, and this bound is optimal. It follows that accurate outer polyhedral approximations are possible only in low dimensions. For n=2, the bound can be lowered to mathcalOleft(frac1sqrtvarepsilonright) directions, which is particularly efficient and the reason why we chose to decompose the system into subsystems of dimension 2."
},

{
    "location": "man/polyhedral_approximations.html#Lotov\'s-method-1",
    "page": "Polyhedral Approximations",
    "title": "Lotov\'s method",
    "category": "section",
    "text": "An overapproximation of the projections of a polyhedron given in constraint form can be obtained using Lotov\'s method; this is a particularly effective method in two dimensions. Lotov\'s algorithm proceeds as follows. Starting with at least n linearly independent template directions, compute an outer approximation. From the corresponding support vectors, compute an inner approximation, as the convex hull of the support vectors. Now compute the facet normals of the inner approximation, and the distance between the facets of the inner and the vertices of the outer approximation. Finally, pick the facet normal with the largest distance, and add it to the template directions. This procedure is repeated until the distance is smaller than the desired error.For more details we refer to the paper."
},

{
    "location": "man/decompose_example.html#",
    "page": "Decomposing an Affine Map",
    "title": "Decomposing an Affine Map",
    "category": "page",
    "text": ""
},

{
    "location": "man/decompose_example.html#Decomposing-an-Affine-Map-1",
    "page": "Decomposing an Affine Map",
    "title": "Decomposing an Affine Map",
    "category": "section",
    "text": "In this section we present an illustrative example of the decomposed image of a linear map.Pages = [\"decompose_example.md\"]\nDepth = 3"
},

{
    "location": "man/decompose_example.html#Preliminaries:-Polygon,-Linear-Map,-and-Plotting-1",
    "page": "Decomposing an Affine Map",
    "title": "Preliminaries: Polygon, Linear Map, and Plotting",
    "category": "section",
    "text": "Consider the matrix-valued function Φ(θ) = beginpmatrix cos (θ)  -sin (θ)  sin (θ)  cos (θ) endpmatrix, θ  π π.using LazySets, LazySets.Approximations, Plots\n\nΦ(theta) = [cos(theta) -sin(theta); sin(theta) cos(theta)]Now define an arbitrary convex polygon with five vertices with operatornameCH denoting the convex hull operation,mathcalX = operatornameCHbig( (1 05) (11 02) (14 03) (17 05) (14 08) big)This set can be defined as:X = VPolygon([[1.0, 0.5], [1.1, 0.2], [1.4, 0.3], [1.7, 0.5], [1.4, 0.8]])note: Note\nYou can as well define the convex hull of the one element sets (singletons) viaC = CHArray([Singleton([1.0, 0.5]), Singleton([1.1, 0.2]), Singleton([1.4, 0.3]), Singleton([1.7, 0.5]), Singleton([1.4, 0.8])])Observe that C is just a lazy convex hull, whereas X is a polygon in vertex representation.Applying the linear map Φ(π4)  mathcalX, we get a new polygon mathcalX which is the counter-clockwise turn of mathcalX by θ triangleq 45. In this package the linear map is not computed explicitly but only wrapped in a LinearMap instance.Xp = Φ(pi/4) * X\n\ntypeof(Xp)Let us plot the two polygons, mathcalX in green and mathcalX in blue.example = plot(X, color=\"green\")\n\nplot!(example, Xp, 1e-2, color=\"blue\")Note that we have passed 1e-2 as additional argument for the LinearMap set (mathcalX) because by default such a set is just plotted as its box (or hyperrectangle) approximation. The value 1e-2 is the precision up to which the set is (over-)approximated with a polgon, which in this case is sufficient to obtain the actual set again."
},

{
    "location": "man/decompose_example.html#Cartesian-Decomposition-1",
    "page": "Decomposing an Affine Map",
    "title": "Cartesian Decomposition",
    "category": "section",
    "text": "Next we want to decompose mathcalX into a Cartesian product of intervals. That is, we project it to the x-axis and y-axis and then compose these intervals again: hatmathcalX = hatmathcalX_1 times hatmathcalX_2.Xhat = overapproximate(X)  # approximation of X with an axis-aligned polygon\n\nplot!(example, Xhat, color=\"gray\", alpha=0.3)"
},

{
    "location": "man/decompose_example.html#Decomposed-Image-of-a-Linear-Map-1",
    "page": "Decomposing an Affine Map",
    "title": "Decomposed Image of a Linear Map",
    "category": "section",
    "text": "Now let us compute the linear map for the box approximation, and let us call it mathcalY = Φ(π4)  hatmathcalX. This will be a diamond-like shape (the box turned by 45°).Y = Φ(pi/4) * Xhat\n\nplot!(example, Y, 1e-2, color=\"yellow\", alpha=0.3)However, we want our approximation be again a Cartesian product of intervals, so we have to overapproximate this diamond-like shape again: hatmathcalY = hatmathcalX = hatmathcalX_1 times hatmathcalX_2Xhatp = overapproximate(Y)\n\nplot!(example, Xhatp, 1e-2, color=\"gray\", alpha=0.3)As we can see, the resulting box hatmathcalX is not a tight overapproximation of mathcalX. We can, however, gain precision by reducing the angle by which we turn the set, e.g., making two smaller turns. Why not try it out?"
},

{
    "location": "man/fast_2d_LPs.html#",
    "page": "Fast 2D LPs",
    "title": "Fast 2D LPs",
    "category": "page",
    "text": ""
},

{
    "location": "man/fast_2d_LPs.html#Fast-2D-LPs-1",
    "page": "Fast 2D LPs",
    "title": "Fast 2D LPs",
    "category": "section",
    "text": "In this section we explain the implementation of the support vector for the case of convex polygons.Pages = [\"fast_2d_LPs.md\"]\nDepth = 3"
},

{
    "location": "man/fast_2d_LPs.html#Introduction-1",
    "page": "Fast 2D LPs",
    "title": "Introduction",
    "category": "section",
    "text": "Since vectors in the plane can be ordered by the angle with respect to the positive real axis, we can efficiently evaluate the support vector of a polygon in constraint representation by comparing normal directions, provided that its edges are ordered.This is illustrated in the following picture.(Image: ../assets/intuition2dlp.png)If the normal directions of the polygon are ordered, the support vector in any direction always lies between two consecutive edges, a_i+1 preceq ell preceq a_i. Here we use the symbol preceq to compare directions, where the increasing direction is counter-clockwise.The following lemma provides an algorithm to find the support vector."
},

{
    "location": "man/fast_2d_LPs.html#Lemma-1",
    "page": "Fast 2D LPs",
    "title": "Lemma",
    "category": "section",
    "text": "Let mathcalX be a polygon described by m linear constraints a_i^T x leq b_i, ordered by the normal vectors (a_i), i.e., a_i preceq a_i+1 for all i in 1ldotsm, where we identify a_m+1 with a_1. Let ell in mathbbR^2 setminus mathbf0_2. Then there exists i in 1dotsm such that a_i preceq ell preceq a_i+1 and every optimal solution barx of the linear program rho_mathcalX(ell) = max ell^T x  x in mathcalX satisfies barx in x  a_i^T x leq b_i cap x  a_i+1^T x leq b_i+1"
},

{
    "location": "man/fast_2d_LPs.html#Algorithm-1",
    "page": "Fast 2D LPs",
    "title": "Algorithm",
    "category": "section",
    "text": "First define a <= b as the comparison of directions using polar angles, with 0 being the direction (1, 0).Now assume that the constraints in a polytope mathcalX are given as a_i x + b_i.The following pseudocode explains how to find barx.σ(d, X):\n    let i be the smallest index such that a_{i-1} <= d and a_i > d\n    return the vertex at the intersection of constraints i and i-1"
},

{
    "location": "man/iterative_refinement.html#",
    "page": "Iterative Refinement",
    "title": "Iterative Refinement",
    "category": "page",
    "text": ""
},

{
    "location": "man/iterative_refinement.html#Iterative-Refinement-1",
    "page": "Iterative Refinement",
    "title": "Iterative Refinement",
    "category": "section",
    "text": "This section of the manual describes an approximation method for an arbitrary two-dimensional convex set S and a given error bound ε using support vectors. The basic idea is to add new supporting directions whenever the approximation error is still bigger than ε.Pages = [\"iterative_refinement.md\"]\nDepth = 3CurrentModule = LazySets.Approximations\nDocTestSetup = quote\n    using Plots, LazySets, LazySets.Approximations\nend"
},

{
    "location": "man/iterative_refinement.html#Local-approximations-1",
    "page": "Iterative Refinement",
    "title": "Local approximations",
    "category": "section",
    "text": "The polygonal approximation of an arbitrary lazy convex set S is represented by a list of local approximations or refinements. More precisely, a local approximation is a triple (p_1 p_2 q), where:p_1 and p_2 belong to S\nthe segments (p_1 q) and (p_2 q) belong to support lines of SSince S is assumed to be convex, the segment (p_1 p_2) is inside S. Taking each support line (p_1 q) of a given list of local approximations of S, we can build a polygon in constraint representation that overapproximates S.The type LocalApproximation{N} implements a local approximation; it is parametric in the numeric type N, and also contains additional information regarding the quality of the approximation: The refinable field is a boolean that is true whenever the approximation can be improved, and err is an upper bound on the exact Hausdorff distance of the approximation with respect to the exact set S.Given the unit ball in the 2-norm, below we plot the local approximation along the East and North directions.using Plots, LazySets, LazySets.Approximations\n\nb = Ball2(zeros(2), 1.)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\n\nplot!(Singleton([1.0, 0.0]), annotations=(1.1, 0.1, text(\"p1\")), color=\"green\")\nplot!(Singleton([0.0, 1.0]), annotations=(0.1, 1.1, text(\"p2\")), color=\"green\")\nplot!(Singleton([1.0, 1.0]), annotations=(1.09, 1.1, text(\"q\")))\nplot!(Singleton([0.0, 0.0]), annotations=(0.1, 0.0, text(\"0\")), color=\"green\")\nplot!(annotations=(1.4, 0.1, text(\"d1\")))\nplot!(annotations=(0.1, 1.4, text(\"d2\")))\nplot!(annotations=(0.75, 0.8, text(\"ndir\")))\n\nplot!(x->x, x->1., -0.8, 1.3, line=1, color=\"black\", linestyle=:dash)\nplot!(x->1., x->x, -0.8, 1.3, line=1, color=\"black\", linestyle=:dash)\nplot!(x->x+1, x->0., 0.0, 0.4, line=1, color=\"red\", linestyle=:solid, arrow=true)\nplot!(x->0., x->x+1, 0.0, 0.4, line=1, color=\"red\", linestyle=:solid, arrow=true)\nplot!(x->-x, x->x+1, -1.2, .2, line=1., color=\"black\", linestyle=:dashdot)\nplot!(x->x+.6, x->x+.6, -.1, .08, line=1, color=\"red\", linestyle=:solid, arrow=true)We can instantiate and append this approximation to a fresh PolygonalOverapproximation object, which is a type that wraps a set and a list of LocalApproximations. The approximation is refinable, since it can be \"split\" along ndir, where ndir is the direction normal to the line (p_1 p_2) (shown dash-dotted in the figure), providing two approximations which are closer to the given set in Hausdorff distance.import LazySets.Approximations:PolygonalOverapproximation, addapproximation!\n\nΩ = PolygonalOverapproximation(b)\np1, d1, p2, d2 = [1.0, 0.0], [1.0, 0.0], [0.0, 1.0], [0.0, 1.0]\napprox_EAST_NORTH = addapproximation!(Ω, p1, d1, p2, d2)\n\napprox_EAST_NORTH.refinableThe associated error is sqrt2-10414213, which is the distance between the point q and the intersection between the line (0 q) and the circle. Actually this point corresponds to the support vector of the set b along ndir.approx_EAST_NORTH.errThe refined approximation is computed next."
},

{
    "location": "man/iterative_refinement.html#Refinement-1",
    "page": "Iterative Refinement",
    "title": "Refinement",
    "category": "section",
    "text": "Basically, the refinement step consists of splitting the local approximation (p_1 p_2 q) into two local approximations (p_1 s q) and (s p_2 q), where s is the support vector of S along ndir.To illustrate this, first let\'s add the remaining three approximations to Ω along the canonical directions, to build a box overapproximation of b.import LazySets.Approximations: refine, tohrep\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\n\n# initialize box directions\nDIR_EAST, DIR_NORTH, DIR_WEST, DIR_SOUTH = [1., 0.], [0., 1.], [-1., 0.], [0., -1.]\npe, pn, pw, ps = σ(DIR_EAST, b), σ(DIR_NORTH, b), σ(DIR_WEST, b), σ(DIR_SOUTH, b)\n\nΩ = PolygonalOverapproximation(b)\naddapproximation!(Ω, ps, DIR_SOUTH, pe, DIR_EAST)\naddapproximation!(Ω, pw, DIR_WEST, ps, DIR_SOUTH)\naddapproximation!(Ω, pn, DIR_NORTH, pw, DIR_WEST)\naddapproximation!(Ω, pe, DIR_EAST, pn, DIR_NORTH)\n\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")Next we refine the first approximation of the list.approx = pop!(Ω.approx_stack)\n(r1, r2) = refine(approx, Ω.S)\npush!(Ω.approx_stack, r2)\npush!(Ω.approx_stack, r1)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")We call r1 and r2 the right and left approximations respectively, since they are saved in counter-clockwise order. We can check that the first two approximations are still refinable.Ω.approx_stack[end].refinable,  Ω.approx_stack[end-1].refinableHence, we can make again a refinement of that approximation.approx = pop!(Ω.approx_stack)\n(r1, r2) = refine(approx, Ω.S)\npush!(Ω.approx_stack, r2)\npush!(Ω.approx_stack, r1)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")The criterion for an approximation being refinable is that we can properly define a normal direction ndir. This boils down to checking for the following \"degenerate\" cases:p_1 and p_2 overlap.\np_1 and q overlap.\np_2 and q overlap.Moreover, we include the condition approx_error > TOL where TOL is the floating point epsilon in the given numerical precision."
},

{
    "location": "man/iterative_refinement.html#Algorithm-1",
    "page": "Iterative Refinement",
    "title": "Algorithm",
    "category": "section",
    "text": "Having presented the individual steps, we give the pseudocode of the iterative refinement algorithm, see approximate(S, ε).The algorithm consists of the following steps:Initialization. The approximation is initialized with box directions, i.e. it starts with four LocalApproximation objects. Let i=1.\nRefinement loop. If the local approximation at index i has an error greater than the threshold ε, then refine. Otherwise, increment i <- i+1.\nRedundancy check. Insert the refined right approximation at position i, and check whether the left approximation is redundant or not with respect to the one at position i+1. Checking for redundancy amounts to checking for overlap of both p1 and q. Then, either substitute at i+1 or insert (keeping the approximation at i+1) depending on the redundancy check.\nStopping criterion. Terminate if the index i exceeds the current length of the approximations list; otherwise continue with step 2.Observe that the algorithm finishes when all approximations are such that their associated error is smaller than ε, hence the Hausdorff distance between S and its polygonal overapproximation is no greater than ε."
},

{
    "location": "man/iterative_refinement.html#Example-1",
    "page": "Iterative Refinement",
    "title": "Example",
    "category": "section",
    "text": "As a final example consider the iterative refinement of the ball b for different values of the approximation threshold ε.import LazySets.Approximations:overapproximate, approximate\n\np0 = plot(b, 1e-6, aspectratio=1)\np1 = plot!(p0, overapproximate(b, 1.), alpha=0.4, aspectratio=1)\n\np0 = plot(b, 1e-6, aspectratio=1)\np2 = plot!(p0, overapproximate(b, 0.1), alpha=0.4, aspectratio=1)\n\np0 = plot(b, 1e-6, aspectratio=1)\np3 = plot!(p0, overapproximate(b, 0.01), alpha=0.4, aspectratio=1)\n\nplot(p1, p2, p3, layout=(1, 3))Meanwhile, the number of constraints of the polygonal overapproximation increases, in this example by a power of 2 when the error is divided by a factor 10.h = ε ->  length(approximate(b, ε).constraints)\nh(1.), h(0.1), h(0.01)note: Note\nActually, the plotting function for an arbitrary LazySet plot(...), called recipe in the context of Plots.jl, is such that it receives a numeric argument ε and the routine itself calls overapproximate. However, some sets such as abstract polygons have their own plotting recipe and hence do not require the error threshold, since they are plotted exactly as the convex hull of their vertices."
},

{
    "location": "man/interval_hulls.html#",
    "page": "Interval Hulls",
    "title": "Interval Hulls",
    "category": "page",
    "text": ""
},

{
    "location": "man/interval_hulls.html#Interval-Hulls-1",
    "page": "Interval Hulls",
    "title": "Interval Hulls",
    "category": "section",
    "text": "In this section we illustrate the interval hull operators as well as several plotting functionalities.Pages = [\"interval_hulls.md\"]\nDepth = 3DocTestSetup = quote\n    using Plots, LazySets, LazySets.Approximations\nend"
},

{
    "location": "man/interval_hulls.html#Balls-and-Singletons-1",
    "page": "Interval Hulls",
    "title": "Balls and Singletons",
    "category": "section",
    "text": "Consider a ball in the 2-norm. By default, the coefficients of this set are 64-bit floating point numbers. Other numeric types (such as lower precision floating point, or rational) can be defined with the proper argument types in the Ball2 constructor.using Plots, LazySets\n\nX = Ball2(ones(2), 0.5)To plot a lazy set, we use the plot function. By design, lazy sets plots overapproximate with box directions only. To have a sharp definition of the borders, use the accuracy as a second argument.plot(X, 1e-3, aspectratio=1)To add plots to the same pair of axes we use plot!. Let\'s add some points of the set which are farthest in some given directions. Single points can be plotted using the Singleton type. In the third line of code we plot the center of the ball picking a custom cross marker.plot!(Singleton(σ([1., 0], X)))\nplot!(Singleton(σ([1., 1], X)))\nplot!(Singleton(X.center), markershape=:x)note: Note\nTo see the list of available plot keyword arguments, use the plotattr([attr]) function, where attr is the symbol :Plot, :Series, :Axis or :Subplot.For the remainder of this section we define another ball in the 2-norm and its convex hull with X.Y = Ball2([-3,-.5], 0.8)\nZ = CH(X, Y)\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)"
},

{
    "location": "man/interval_hulls.html#Ballinf-approximation-1",
    "page": "Interval Hulls",
    "title": "Ballinf approximation",
    "category": "section",
    "text": "A simple overapproximation with a BallInf is obtained with the ballinf_approximation function, from the Approximations module. It overapproximates a convex set by a tight ball in the infinity norm by evaluating the support vector in the canonical directions.import LazySets.Approximations.ballinf_approximation\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nBapprox = ballinf_approximation(Z)\n\nplot!(Bapprox, alpha=0.1)\nplot!(Singleton(Bapprox.center), markershape=:x)Bapprox.center, Bapprox.radius"
},

{
    "location": "man/interval_hulls.html#Interval-hull-approximation-1",
    "page": "Interval Hulls",
    "title": "Interval hull approximation",
    "category": "section",
    "text": "If we want to have different lengths for each dimension, instead of the ballinf_approximation, we can use the approximation with a hyperrectangle through the interval_hull function.import LazySets.Approximations.interval_hull\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nHapprox = interval_hull(Z)\n\nplot!(Happrox, alpha=0.1)\nplot!(Singleton(Happrox.center), markershape=:x)Happrox.center, Happrox.radiusnote: Note\nThe interval_hull function is an alias for the box_approximation function. The nomenclature for approximation functions is *_approximation_*. To see a list of all approximation functions, either search in the docs or type names(LazySets.Approximations)."
},

{
    "location": "man/interval_hulls.html#Symmetric-interval-hull-1",
    "page": "Interval Hulls",
    "title": "Symmetric interval hull",
    "category": "section",
    "text": "Contrary to the previous approximations, the symmetric interval hull is centered around the origin. It is defined in the Approximations module as well.import LazySets.Approximations.symmetric_interval_hull\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nS = symmetric_interval_hull(Z)\nplot!(S, alpha=0.2)\nplot!(Singleton(S.center), markershape=:x)S.center, S.radiusWe can get the list of vertices using the vertices_list function:vertices_list(S)For instance, compute the support vector in the south-east direction:σ([1., -1.], S)It is also possible to pass a sparse vector as direction, and the result is a sparse vector:σ(sparsevec([1., -1.]), S)"
},

{
    "location": "man/interval_hulls.html#Norm,-radius-and-diameter-1",
    "page": "Interval Hulls",
    "title": "Norm, radius and diameter",
    "category": "section",
    "text": "In this part we illustrate some functions to obtain metric properties of sets, applied to the sets X, Y and Z defined previously, in the infinity norm. These functions apply generally to any LazySet. For some types, specialized methods are triggered automatically through multiple-dispatch.The norm of a convex set is the norm of the enclosing ball (of the given norm) of minimal volume. For instance:import LazySets.Approximations: norm, radius, diameter\n\nnorm(X), norm(Y), norm(Z)The radius of a convex set. It is the radius of the enclosing ball (of the given norm) of minimal volume with the same center. In the previous example,radius(X), radius(Y), radius(Z)Finally, it is sometimes convenient to ask directly the diameter of the set, defined as twice the radius:diameter(X), diameter(Y), diameter(Z)"
},

{
    "location": "man/convex_hulls.html#",
    "page": "Convex Hulls",
    "title": "Convex Hulls",
    "category": "page",
    "text": ""
},

{
    "location": "man/convex_hulls.html#Convex-Hulls-1",
    "page": "Convex Hulls",
    "title": "Convex Hulls",
    "category": "section",
    "text": "In this section we illustrate the convex hull operation. We give examples of the symbolic implementation, and the concrete convex hull in low dimensions.Pages = [\"convex_hulls.md\"]\nDepth = 3DocTestSetup = quote\n    using Plots, LazySets, LazySets.Approximations\nend"
},

{
    "location": "man/convex_hulls.html#Symbolic-convex-hull-1",
    "page": "Convex Hulls",
    "title": "Symbolic convex hull",
    "category": "section",
    "text": "The lazy convex hull, ConvexHull, is the binary operator that implements the convex hull of the union between two convex sets.using Plots, LazySets\n\nA = 1/sqrt(2.) * [1 -1; 1 1]\nBn = n -> BallInf(ones(n), 0.2)\n\nX = Bn(2)\nY = CH(X, expm(A) * X)The name CH is an alias for ConvexHull, so you can use both interchangeably. This type is parametric in the operands\'s types.p = plot(X, 1e-2, color=\"blue\")\nplot!(p, expm(A) * X, 1e-2, color=\"green\")\nplot!(p, Y, 1e-2, color=\"red\", alpha=0.2)We can as well work with a 100-dimensional set:X = Bn(100)\nA = blkdiag([sparse(A) for i in 1:50]...)\nY = CH(X, expm(full(A)) * X)\n\ndim(Y)To take the convex hull of a large number of sets, there is the n-ary type ConvexHullArray. For instance, below we create a collection of balls b via list comprehension, and pass them to create a new ConvexHullArray instance.b = [Ball2([2*pi*i/100, sin(2*pi*i/100)], 0.05) for i in 1:100];\nc = ConvexHullArray(b);\n\nplot(c, 1e-3, alpha=0.1, color=\"blue\")\nplot!(b, 1e-3, alpha=0.5, color=\"red\")"
},

{
    "location": "man/convex_hulls.html#D-convex-hull-1",
    "page": "Convex Hulls",
    "title": "2D convex hull",
    "category": "section",
    "text": "In two dimensions the convex_hull function computes the concrete convex hull of a set of points.points = N -> [randn(2) for i in 1:N]\nv = points(30)\nhull = convex_hull(v)\ntypeof(hull), length(v), length(hull)Notice that the output is a vector of floating point numbers representing the coordinates of the points, and that the number of points in the convex hull has decreased.We can plot both the random points and the polygon generated by the convex hull with the plot function:p = plot([Singleton(vi) for vi in v])\nplot!(p, VPolygon(hull), alpha=0.2)"
},

{
    "location": "man/convex_hulls.html#Using-static-vectors-1",
    "page": "Convex Hulls",
    "title": "Using static vectors",
    "category": "section",
    "text": "Usual vectors are such that you can push! and pop! without changing its type: the size is not a static property. Vectors of fixed size, among other types, are provided by the StaticArrays.jl package from the JuliaArrays ecosystem. Using static arrays for vectors of \"small\" dimension can dramatically improve performance.Since the convex hull algorithm supports any AbstractVector, it can be applied with static vectors. The following example illustrates this fact.v = points(1000)\nconvex_hull(points(3)) # warm-up\n\n@time convex_hull(v)Now working with static vectors:using StaticArrays\n\nconvex_hull([@SVector(rand(2)) for i in 1:3]) # warm-up\n\nv_static = [SVector{2, Float64}(vi) for vi in v]\n@time convex_hull(v_static)"
},

{
    "location": "man/set_operations.html#",
    "page": "Operations on Sets",
    "title": "Operations on Sets",
    "category": "page",
    "text": ""
},

{
    "location": "man/set_operations.html#Operations-on-sets-1",
    "page": "Operations on Sets",
    "title": "Operations on sets",
    "category": "section",
    "text": "In this section we show which typical set operations this library supports.Pages = [\"set_operations.md\"]\nDepth = 3We use the following four sets for illustration.using LazySets, LazySets.Approximations, Plots\nB1 = Ball1(-ones(2), 1.)\nB2 = Ball2(ones(2), 1.)\nBI = BallInf(zeros(2), 1.)\nH = Hyperrectangle(ones(2), ones(2))\nsets = [B1, B2, BI, H]\n\nfunction plot_sets(sets)\n    for S in sets\n        println(S)\n        plot!(S, 1e-2, fillalpha=0.1)\n    end\nend\n\nfunction plot_points(points, prefix)\n    for i in eachindex(points)\n        p = points[i]\n        num_occur = length(find(x -> x == p, points[1:i]))\n        x = p[1]\n        y = p[2]\n        if num_occur == 1\n            x += 0.15\n        elseif num_occur == 2\n            y += 0.15\n        elseif num_occur == 3\n            x -= 0.15\n        else\n            y -= 0.15\n        end\n        plot!(Singleton(p))\n        plot!(annotations=(x, y, text(\"$(prefix)$(i)\")))\n    end\nend\n\nplot1 = plot()\nplot_sets(sets)\nplot1"
},

{
    "location": "man/set_operations.html#Unary-operations-1",
    "page": "Operations on Sets",
    "title": "Unary operations",
    "category": "section",
    "text": "The following table lists all operations that take one convex set as argument in the columns. In the rows we list all set types, both the interfaces (where we abbreviate the Abstract prefix), the basic set types, and the lazy set operations, each sorted alphabetically. The table entries have the following meaning.\"x\" indicates that the operation is implemented for the respective set type.\n\"i\" indicates that the operation is inherited from a supertype.type ↓ \\ operation → dim ρ σ an_element ∈ isempty linear_map norm radius diameter\nInterfaces          \nLazySet  x  x      x\nAPolytope  i  i  x x   i\nACentrallySymmetric x i  x  x    i\nACentrallySymmetricPolytope i i  i  x i   i\nAPolygon x i  i  i i   i\nAHyperrectangle i i x i x i i x x i\nAHPolygon i i  x x i i   i\nASingleton i i x i x i x i i i\n          \nBasic set types          \nBall1 i i x i x i i   i\nBall2 i i x i x i    i\nBallInf i i i i i i i i x i\nBallp i i x i x i    i\nEllipsoid i i x i x i    i\nEmptySet x i x x x x  x x x\nHalfSpace x i x x x x    i\nHPolygon/HPolygonOpt i i x i i i i   i\nHPolyhedron x x x i x x    i\nHPolytope x x x i x x i   i\nHyperplane x i x x x x    i\nHyperrectangle i i i i i i i i i i\nInterval x i x x x i i i i i\nLine x i x x x x    i\nLineSegment x i x x x i i   i\nSingleton i i i i i i i i i i\nVPolygon i i x x x i x   i\nVPolytope x i x i  i x   i\nZeroSet x i x i x i x i i i\nZonotope i i x i x i x   i\n          \nLazy set operation types          \nCartesianProduct x x x i x x    i\nCartesianProductArray x x x i x x    i\nConvexHull x x x i  x    i\nConvexHullArray x x x i  x    i\nExponentialMap x x x i x x    i\nExponentialProjectionMap x i x i  x    i\nIntersection x x  i x x    i\nIntersectionArray x i  i x     i\nLinearMap x x x x x x    i\nMinkowskiSum x x x i  x    i\nMinkowskiSumArray x x x i  x    i\nCacheMinkowskiSum x i x i  x    i\nSymmetricIntervalHull x i x i i i i i i i"
},

{
    "location": "man/set_operations.html#dim-1",
    "page": "Operations on Sets",
    "title": "dim",
    "category": "section",
    "text": "This function returns the dimension of the set.dim(B1), dim(B2), dim(BI), dim(H)"
},

{
    "location": "man/set_operations.html#ρ/σ-1",
    "page": "Operations on Sets",
    "title": "ρ/σ",
    "category": "section",
    "text": "These functions return the support function resp. the support vector of the set."
},

{
    "location": "man/set_operations.html#an_element-1",
    "page": "Operations on Sets",
    "title": "an_element",
    "category": "section",
    "text": "This function returns some element in the set. Consecutive calls to this function typically return the same element.an_element(B1), an_element(B2), an_element(BI), an_element(H)"
},

{
    "location": "man/set_operations.html#-1",
    "page": "Operations on Sets",
    "title": "∈",
    "category": "section",
    "text": "This function checks containment of a given vector in the set. The operator can be used in infix notation (v ∈ S) and in inverse operand order (S ∋ v). Alias: inp1 = [1.5, 1.5]\np2 = [0.1, 0.1]\np3 = [-0.9, -0.8]\npoints = [p1, p2, p3]\n\nfor p in [p1, p2, p3]\n    println(\"$p ∈ (B1, B2, BI, H)? ($(p ∈ B1), $(p ∈ B2), $(p ∈ BI), $(p ∈ H))\")\nendplot1 = plot()\nplot_sets(sets)\nplot_points(points, \"p\")\nplot1"
},

{
    "location": "man/set_operations.html#isempty-1",
    "page": "Operations on Sets",
    "title": "isempty",
    "category": "section",
    "text": "This function checks if the set is empty."
},

{
    "location": "man/set_operations.html#linear_map-1",
    "page": "Operations on Sets",
    "title": "linear_map",
    "category": "section",
    "text": "This function applies a concrete linear map to the set. The resulting set may be of a different type."
},

{
    "location": "man/set_operations.html#norm-1",
    "page": "Operations on Sets",
    "title": "norm",
    "category": "section",
    "text": "This function returns the norm of a set. It is defined as the norm of the enclosing ball (of the given norm) of minimal volume centered in the origin.# print 1-norm, 2-norm, and infinity norm (if available)\nprintln((\"-\", \"-\", norm(B1, Inf)))\nprintln((\"-\", \"-\", norm(B2, Inf)))\nprintln((norm(BI, 1), norm(BI, 2), norm(BI, Inf)))\nprintln((norm(H, 1), norm(H, 2), norm(H, Inf)))"
},

{
    "location": "man/set_operations.html#radius-1",
    "page": "Operations on Sets",
    "title": "radius",
    "category": "section",
    "text": "This function returns the radius of a set. It is defined as the radius of the enclosing ball (of the given norm) of minimal volume with the same center.radius(B1), radius(B2), radius(BI), radius(H)"
},

{
    "location": "man/set_operations.html#diameter-1",
    "page": "Operations on Sets",
    "title": "diameter",
    "category": "section",
    "text": "This function returns the diameter of a set. It is defined as the diameter of the enclosing ball (of the given norm) of minimal volume with the same center. The implementation is inherited for all set types if the norm is the infinity norm, in which case the result is defined as twice the radius.diameter(B1), diameter(B2), diameter(BI), diameter(H)"
},

{
    "location": "man/set_operations.html#Binary-operations-1",
    "page": "Operations on Sets",
    "title": "Binary operations",
    "category": "section",
    "text": "The following table lists all operations that take two convex set as argument in the entries. In the rows we list all set types, both the interfaces (where we abbreviate the Abstract prefix), the basic set types, and the lazy set operations, each sorted alphabetically. In the columns we also list the operations, but abbreviated. The table entries consist of subsets of the following list of operations.\"⊆\" stands for the subset check issubset.\n\"⊎\" stands for the disjointness check isdisjoint.\n\"∩\" stands for the concrete intersection operation intersection.\n\"C\" stands for the conversion operation convert.\n\"-\" indicates that the two types\' dimensionality constraints are incompatible.\nA suffix \"i\" indicates that the operation is inherited from a supertype.type ↓ \\ type → LazyS APtop ACSym ACSPt APgon AHrec AHPgn ASing Ball1 Ball2 BInf Ballp Ellip Empty HalfS HPgon HPhed HPtop Hplan Hrect Itrvl Line LineS Singl VPgon VPtop ZeroS Zonot CP CPA CH CHA EMap EPM Itsct ItscA LiMap MS MSA CMS SIH\nInterfaces               ⊎                          \nLazySet ⊎ ⊎i ⊎i ⊎i ⊎i ⊆  ⊎i ⊆i ⊎ ⊎ ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎ ⊎ ⊆i ⊎ ⊆i ⊎i ⊎i ⊎ ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i\nAPolytope ⊆  ⊎i ⊆i ⊎i ∩ ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆  ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩ ⊆i ⊎i ∩ ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nACentrallySymmetric ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nACentrallySymmetricPolytope ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nAPolygon ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i - ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nAHyperrectangle ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆  ⊎  ∩ ⊆i ⊎i ∩i ⊆i ⊎  ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nAHPolygon ⊆i ⊎ ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩ ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i - ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i C ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nASingleton ⊆  ⊎ ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆  ⊎  ∩i ⊆i ⊎i ∩i ⊆  ⊎  ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\n               ⊎                          \nBasic set types               ⊎                          \nBall1 ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nBall2 ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆  ⊎i ⊎i ⊆ ⊎ ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆  ⊎i ⊎i ⊎i ⊆  ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nBallInf ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nBallp ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆  ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆  ⊎i ⊎i ⊎i ⊆  ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nEllipsoid ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nEmptySet ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nHalfSpace ⊎ ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎ ⊎i ⊎i ∩ ⊎i ∩ ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nHPolygon/HPolygonOpt ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i C ⊆i ⊎i ∩i C ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i C ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ∩i C ⊆i ⊎i ⊆i ⊎i ∩i Ci - ⊆i ⊎i ⊆i ⊎i ∩i C ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci\nHPolyhedron ⊎ ⊎i ∩  C ⊎i ⊎i ∩i Ci ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊎i ∩i Ci ⊎i ⊆i ⊎i ∩i Ci ⊎i ⊎i ⊎i ⊎i ∩ ⊎i ∩i Ci ⊎i ∩ ⊎i ∩  Ci ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊎i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊎i ∩i Ci ⊎i ∩  Ci ⊆i ⊎i ∩i Ci ⊎i ∩i Ci ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ∩i Ci\nHPolytope ⊆i ⊎ ⊆i ⊎i ∩  C ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i C ⊆i ⊎i ∩i C ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩ ⊆i ⊎i ∩i C ⊆i ⊎i ∩ ⊆i ⊎i ∩  Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩  C ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci\nHyperplane ⊎ ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎ ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nHyperrectangle ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i C ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nInterval ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i - ⊆i ⊎i ∩i - ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i - ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i - - ⊆i ⊎i ∩i - ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nLine ⊎ ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i - ⊎i ∩ ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nLineSegment ⊆  ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆  ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i - ⊆i ⊎i ⊆i ⊎  ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nSingleton ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nVPolygon ⊆i ⊎i ⊆i ⊎i ∩i C ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i C ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci - ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci\nVPolytope ⊆i ⊎i ⊆i ⊎i ∩i C ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩ ⊆i ⊎i ∩  C ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩  Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci\nZeroSet ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i\nZonotope ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i C ⊆i ⊎i ∩i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎ ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i Ci ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i Ci ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i Ci\n               ⊎                          \nLazy set operation types               ⊎                          \nCartesianProduct ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nCartesianProductArray ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nConvexHull ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nConvexHullArray ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nExponentialMap ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nExponentialProjectionMap ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nIntersection ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nIntersectionArray ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nLinearMap ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nMinkowskiSum ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nMinkowskiSumArray ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nCacheMinkowskiSum ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊆i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊎i ⊆i ⊎i\nSymmetricIntervalHull ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ∩i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ⊆i ⊎i ∩i"
},

{
    "location": "man/set_operations.html#-2",
    "page": "Operations on Sets",
    "title": "⊆",
    "category": "section",
    "text": "This function checks whether a set is a subset of another set. It can optionally produce a witness if the subset relation does not hold. The operator can be used in infix notation (X ⊆ S). Alias: issubsetprintln(B1 ⊆ B2)\nw1 = ⊆(B1, B2, true)[2]\nprintln(B1 ⊆ BI)\nw2 = ⊆(B1, BI, true)[2]\nprintln(B1 ⊆ H)\nw3 = ⊆(B1, H, true)[2]\n# \'B2 ⊆ B1\' is not supported yet\n# w11 = ⊆(B2, B1, true)[2]\nprintln(B2 ⊆ BI)\nw4 = ⊆(B2, BI, true)[2]\nprintln(B2 ⊆ H)\nprintln(BI ⊆ B1)\nw5 = ⊆(BI, B1, true)[2]\nprintln(BI ⊆ B2)\nw6 = ⊆(BI, B2, true)[2]\nprintln(BI ⊆ H)\nw7 = ⊆(BI, H, true)[2]\nprintln(H ⊆ B1)\nw8 = ⊆(H, B1, true)[2]\nprintln(H ⊆ B2)\nw9 = ⊆(H, B2, true)[2]\nprintln(H ⊆ BI)\nw10 = ⊆(H, BI, true)[2];witnesses = [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10]\n\nplot1 = plot()\nplot_sets(sets)\nplot_points(witnesses, \"w\")\nplot1"
},

{
    "location": "man/set_operations.html#is_intersection_empty-1",
    "page": "Operations on Sets",
    "title": "is_intersection_empty",
    "category": "section",
    "text": "This function checks whether the intersection of two sets is empty. It can optionally produce a witness if the intersection is nonempty.println(is_intersection_empty(BI, H))\nw1 = is_intersection_empty(BI, H, true)[2]\n# none of the other combinations are supported yet\n# is_intersection_empty(B1, B2)\n# is_intersection_empty(B1, BI)\n# is_intersection_empty(B1, H)\n# w2 = is_intersection_empty(B1, H, true)[2]\n# is_intersection_empty(B2, BI)\n# is_intersection_empty(B2, H)witnesses = [w1]\n\nplot1 = plot()\nplot_sets(sets)\nplot_points(witnesses, \"w\")\nplot1"
},

{
    "location": "man/reach_zonotopes.html#",
    "page": "A Reachability Algorithm",
    "title": "A Reachability Algorithm",
    "category": "page",
    "text": ""
},

{
    "location": "man/reach_zonotopes.html#A-Reachability-Algorithm-Using-Zonotopes-1",
    "page": "A Reachability Algorithm",
    "title": "A Reachability Algorithm Using Zonotopes",
    "category": "section",
    "text": "Pages = [\"reach_zonotopes.md\"]\nDepth = 3"
},

{
    "location": "man/reach_zonotopes.html#Introduction-1",
    "page": "A Reachability Algorithm",
    "title": "Introduction",
    "category": "section",
    "text": "In this section we present an algorithm implemented using LazySets that computes the reach sets of an affine ordinary differential equation (ODE). This algorithm is from A. Girard\'s \"Reachability of uncertain linear systems using zonotopes, HSCC. Vol. 5. 2005. We have chosen this algorithm for the purpose of illustration of a complete application of LazySets.Let us introduce some notation. Consider the continuous initial set-valued problem (IVP)    x(t) = A x(t) + u(t)in the time interval t  0 T, where:A is a real matrix of order n,\nu(t) is a non-deterministic input such that Vert u(t) Vert_  μ for all t,\nx(0)  mathcalX_0, where mathcalX_0 is a convex set.Given a step size δ, Algorithm1 returns a sequence of sets that overapproximates the states reachable by any trajectory of this IVP."
},

{
    "location": "man/reach_zonotopes.html#Algorithm-1",
    "page": "A Reachability Algorithm",
    "title": "Algorithm",
    "category": "section",
    "text": "using Plots, LazySets\n\nfunction Algorithm1(A, X0, δ, μ, T)\n    # bloating factors\n    Anorm = norm(A, Inf)\n    α = (expm(δ * Anorm) - 1 - δ * Anorm) / norm(X0, Inf)\n    β = (expm(δ * Anorm) - 1) * μ / Anorm\n\n    # discretized system\n    n = size(A, 1)\n    ϕ = expm(δ * A)\n    N = floor(Int, T / δ)\n\n    # preallocate arrays\n    Q = Vector{LazySet}(N)\n    R = Vector{LazySet}(N)\n\n    # initial reach set in the time interval [0, δ]\n    ϕp = (I+ϕ) / 2\n    ϕm = (I-ϕ) / 2\n    c = X0.center\n    Q1_generators = hcat(ϕp * X0.generators, ϕm * c, ϕm * X0.generators)\n    Q[1] = Zonotope(ϕp * c, Q1_generators) ⊕ BallInf(zeros(n), α + β)\n    R[1] = Q[1]\n\n    # set recurrence for [δ, 2δ], ..., [(N-1)δ, Nδ]\n    ballβ = BallInf(zeros(n), β)\n    for i in 2:N\n        Q[i] = ϕ * Q[i-1] ⊕ ballβ\n        R[i] = Q[i]\n    end\n    return R\nend\nnothing # hide"
},

{
    "location": "man/reach_zonotopes.html#Projection-1",
    "page": "A Reachability Algorithm",
    "title": "Projection",
    "category": "section",
    "text": "function project(R, vars, n)\n    # projection matrix\n    M = sparse(1:2, vars, [1., 1.], 2, n)\n    return [M * Ri for Ri in R]\nend\nnothing # hide"
},

{
    "location": "man/reach_zonotopes.html#Example-1-1",
    "page": "A Reachability Algorithm",
    "title": "Example 1",
    "category": "section",
    "text": "A = [-1 -4; 4 -1]\nX0 = Zonotope([1.0, 0.0], Matrix(0.1*I, 2, 2))\nμ = 0.05\nδ = 0.02\nT = 2.\n\nR = Algorithm1(A, X0, δ, μ, 2 * δ); # warm-up\n\nR = Algorithm1(A, X0, δ, μ, T)\n\nplot(R, 1e-2, fillalpha=0.1)"
},

{
    "location": "man/reach_zonotopes.html#Example-2-1",
    "page": "A Reachability Algorithm",
    "title": "Example 2",
    "category": "section",
    "text": "A = Matrix{Float64}([-1 -4 0 0 0;\n                      4 -1 0 0 0;\n                      0 0 -3 1 0;\n                      0 0 -1 -3 0;\n                      0 0 0 0 -2])\nX0 = Zonotope([1.0, 0.0, 0.0, 0.0, 0.0], Matrix(0.1*I, 5, 5))\nμ = 0.01\nδ = 0.005\nT = 1.\n\nR = Algorithm1(A, X0, δ, μ, 2 * δ); # warm-up\n\nR = Algorithm1(A, X0, δ, μ, T)\nRproj = project(R, [1, 3], 5)\n\nplot(Rproj, 1e-2, fillalpha=0.1, xlabel=\"x1\", ylabel=\"x3\")"
},

{
    "location": "man/reach_zonotopes_hybrid.html#",
    "page": "A Hybrid Reachability Algorithm",
    "title": "A Hybrid Reachability Algorithm",
    "category": "page",
    "text": ""
},

{
    "location": "man/reach_zonotopes_hybrid.html#A-Hybrid-Reachability-Algorithm-Using-Zonotopes-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "A Hybrid Reachability Algorithm Using Zonotopes",
    "category": "section",
    "text": "Pages = [\"reach_zonotopes_hybrid.md\"]\nDepth = 3"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Introduction-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Introduction",
    "category": "section",
    "text": "In this section we present an algorithm implemented using LazySets that computes the reach sets of a hybrid system of linear ordinary differential equations (ODE). This algorithm is an extension of the one presented in A Reachability Algorithm Using Zonotopes.We consider a simple case here where modes do not have invariants and transitions do not have updates. In set-based analysis like ours, it may make sense to take a transition as soon as one state in the current set of states can take it. Note that this is not equivalent to must semantics of hybrid automata (also called urgent transitions), which is defined on single trajectories. We also offer the usual may transitions interpretation."
},

{
    "location": "man/reach_zonotopes_hybrid.html#Hybrid-algorithm-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Hybrid algorithm",
    "category": "section",
    "text": "The hybrid algorithm maintains a queue of triples (m X t) where m is a mode, X is a set of states, and t is a time point. For each element in the queue the algorithm calls the Continuous algorithm to compute the reachable states in the current mode m, starting in the current states X at time t. The result is a flowpipe, i.e., a sequence of sets of states. For each of those sets we check intersection with the guards of m\'s outgoing transitions. Depending on the transition semantics, we add the discrete successors to the queue and continue with the next iteration until the queue is empty.using Plots, LazySets\n\nfunction reach_hybrid(As, Ts, init, δ, μ, T, max_order, instant_transitions)\n    # initialize queue with initial mode and states at time t=0\n    queue = [(init[1], init[2], 0.)]\n\n    res = Tuple{LazySet, Int}[]\n    while !isempty(queue)\n        init, loc, t = pop!(queue)\n        println(\"currently in location $loc at time $t\")\n        R = reach_continuous(As[loc], init, δ, μ, T-t, max_order)\n        found_transition = false\n        for i in 1:length(R)-1\n            S = R[i]\n            push!(res, (S, loc))\n            for (guard, tgt_loc) in Ts[loc]\n                if !is_intersection_empty(S, guard)\n                    new_t = t + δ * i\n                    push!(queue, (S, tgt_loc, new_t))\n                    found_transition = true\n                    println(\"transition $loc -> $tgt_loc at time $new_t\")\n                end\n            end\n            if instant_transitions && found_transition\n                break\n            end\n        end\n        if !instant_transitions || !found_transition && length(R) > 0\n            push!(res, (R[end], loc))\n        end\n    end\n    return res\nend\nnothing # hide"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Continuous-algorithm-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Continuous algorithm",
    "category": "section",
    "text": "This is basically the same implementation as outlined in the section A Reachability Algorithm Using Zonotopes, only that this time we use concrete operations on zonotopes.function reach_continuous(A, X0, δ, μ, T, max_order)\n    # bloating factors\n    Anorm = norm(A, Inf)\n    α = (expm(δ*Anorm) - 1 - δ*Anorm)/norm(X0, Inf)\n    β = (expm(δ*Anorm) - 1)*μ/Anorm\n\n    # discretized system\n    n = size(A, 1)\n    ϕ = expm(δ*A)\n    N = floor(Int, T/δ)\n\n    # preallocate array\n    R = Vector{LazySet}(N)\n    if N == 0\n        return R\n    end\n\n    # initial reach set in the time interval [0, δ]\n    ϕp = (I+ϕ)/2\n    ϕm = (I-ϕ)/2\n    c = X0.center\n    gens = hcat(ϕp * X0.generators, ϕm * c, ϕm * X0.generators)\n    R[1] = minkowski_sum(Zonotope(ϕp * c, gens),\n                         Zonotope(zeros(n), Matrix((α + β)*I, n, n)))\n    if order(R[1]) > max_order\n        R[1] = reduce_order(R[1], max_order)\n    end\n\n    # set recurrence for [δ, 2δ], ..., [(N-1)δ, Nδ]\n    ballβ = Zonotope(zeros(n), Matrix(β*I, n, n))\n    for i in 2:N\n        R[i] = minkowski_sum(linear_map(ϕ, R[i-1]), ballβ)\n        if order(R[i]) > max_order\n            R[i] = reduce_order(R[i], max_order)\n        end\n    end\n    return R\nend\nnothing # hide"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Plotting-results-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Plotting results",
    "category": "section",
    "text": "For illustration purposes it is helpful to plot the flowpipes in different colors, depending on the current mode. The following function does that for 2-mode models.function plot_res(res)\n    p = plot()\n    for i in 1:length(res)\n        if res[i][2] == 1\n            c = \"blue\"\n        elseif res[i][2] == 2\n            c = \"red\"\n        end\n        plot!(p, reduce_order(res[i][1], 2), color=c, alpha=0.1)\n    end\n    return p\nend\nnothing # hide"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Example-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Example",
    "category": "section",
    "text": "We consider an extension of the example presented in Reachability of uncertain linear systems using zonotopes, A. Girard, HSCC. Vol. 5. 2005 to a hybrid system with two modes ell_i, i = 1 2, with initial states 09 11 times -01 01 and uncertain inputs from a set u with mu = Vert u Vert_infty = 0001.The dynamics matrices A_i are defined as follows:	A_1 = beginpmatrix -1  -4  4  -1 endpmatrix qquad A_2 = beginpmatrix 1  4  -4  -1 endpmatrixWe add a transition t_i from mode ell_i to ell_3-i with a hyperplane guard g_i:	g_1 triangleq x_1 = -05 qquad g_2 triangleq x_2 = -03LazySets offers an order reduction function for zonotopes, which we used here with an upper bound of 10 generators. We plot the reachable states for the time interval 0 4 and time step δ = 0001.    # dynamics\n    A1 = [-1 -4; 4 -1]\n    A2 = [1 4; -4 -1]\n    As = [A1, A2]\n\n    # transitions\n    t1 = [(Hyperplane([1., 0.], -0.5), 2)]\n    t2 = [(Hyperplane([0., 1.], -0.3), 1)]\n    Ts = [t1, t2]\n\n    # initial condition\n    X0 = Zonotope([1.0, 0.0], Matrix(0.1*I, 2, 2))\n    init_loc = 1\n    init = (X0, init_loc)\n\n    # input uncertainty\n    μ = 0.001\n\n    # discretization step\n    δ = 0.001\n\n    # time bound\n    T = 4.\n\n    # maximum order of zonotopes\n    max_order = 10\n\n    # take transitions only the first time they are enabled?\n    instant_transitions = true\n\n    # run analysis\n    res = reach_hybrid(As, Ts, init, δ, μ, T, max_order, instant_transitions)\n\n    # plot result\n    plot_res(res)"
},

{
    "location": "man/concrete_polyhedra.html#",
    "page": "Concrete Polyhedra",
    "title": "Concrete Polyhedra",
    "category": "page",
    "text": ""
},

{
    "location": "man/concrete_polyhedra.html#Concrete-Polyhedra-1",
    "page": "Concrete Polyhedra",
    "title": "Concrete Polyhedra",
    "category": "section",
    "text": "The focus of LazySets.jl is to wrap set representations and operations into specialized types, delaying the evaluation of the result of an expression until it is necessary. However, sometimes it is necessary to do an explicit computation. For concrete operations with polyhedra we rely on the polyhedra manipulation library Polyhedra.jl.Actually, Polyhedra.jl provides a unified interface to well-known implementations of polyhedral computations, such as CDD or LRS (see the complete list in the documentation of Polyhedra.jl). This is a great advantage because we can easily use a library that supports floating point arithmetic, rational arithmetic, multiple precision, etc. The libraries also include projection and elimination of variables through Fourier-Motzkin.Below we give examples of operations that are actually done via Polyhedra.jl.Pages = [\"concrete_polyhedra.md\"]\nDepth = 3DocTestSetup = quote\n    using Plots, LazySets, LazySets.Approximations, Polyhedra\nend"
},

{
    "location": "man/concrete_polyhedra.html#Creating-polyhedra-1",
    "page": "Concrete Polyhedra",
    "title": "Creating polyhedra",
    "category": "section",
    "text": "To use the Polyhedra.jl interface, you need to load the package with using Polyhedra. Let\'s create an H-representation object:using Plots, LazySets, Polyhedra\n\nA = [1. 1;1 -1;-1 0]\nb = [1.,0,0]\nH = Polyhedra.hrep(A, b)It is used to instantiate a new polyhedron:p = polyhedron(H)Now, p is of the generic type Polyhedra.SimplePolyhedron{2,Float64, ...}, where 2 states for its ambient dimension, and Float64 the numeric field. The remaining fields specify the type of representation:typeof(p)Observe that we can use a particular backend, such as the CDD library:using CDDLib\n\np = polyhedron(H, CDDLib.Library())On the other hand, a LazySets.HPolytope object can be constructed from p:x = HPolytope(p)\nx.constraintsConversely, from a HPolytope we can build a polyhedron:y = polyhedron(x)\ntypeof(y)Moreover, you can specify the backend with an extra argument. For instance, we can use an exact representation through the Library(:exact):A, b = Rational{Int}[1 1;1 -1;-1 0], Rational{Int}[1,0,0]\np = HPolytope(A, b)\n\npolyhedron(p, CDDLib.Library(:exact))"
},

{
    "location": "man/concrete_polyhedra.html#Methods-1",
    "page": "Concrete Polyhedra",
    "title": "Methods",
    "category": "section",
    "text": "The utility methods available are convex hull, intersection and cartesian product. The dual representation as a list of vertices can be obtained with the vertices_list function.p = HPolytope([LinearConstraint([1.0, 0.0], 1.0),\n               LinearConstraint([0.0, 1.0], 1.0),\n               LinearConstraint([-1.0, 0.0], 1.0),\n               LinearConstraint([0.0, -1.0], 1.0)])\n\nconstraints_list(p)vertices_list(p)For example, the concrete intersection of two polytopes is performed with the intersection method.E = Ellipsoid(ones(2), diagm([2.0, 0.5]))\nB = Ball1([2.5, 1.5], .8)\n\nimport LazySets.Approximations.overapproximate\npolyoverapprox(x) = HPolytope(overapproximate(x, 1e-3).constraints)\n\nEpoly = polyoverapprox(E)\nBpoly = polyoverapprox(B)\nX = intersection(Epoly, Bpoly)\n\nplot(E, 1e-3, aspectratio=1, alpha=0.4)\nplot!(B, 1e-3, alpha=0.4)\nplot!(X, 1e-3, alpha=0.4, color=\"black\")"
},

{
    "location": "man/concrete_polyhedra.html#Projections-1",
    "page": "Concrete Polyhedra",
    "title": "Projections",
    "category": "section",
    "text": "Projection of high-dimensional polyhedra and elimination of variables can be performed with the eliminate function, which supports three types of methods: :FourierMotzkin, :BlockElimination and :ProjectGenerators.For further details, see the documentation of Polyhedra.jl."
},

{
    "location": "lib/interfaces.html#",
    "page": "Set Interfaces",
    "title": "Set Interfaces",
    "category": "page",
    "text": ""
},

{
    "location": "lib/interfaces.html#Set-Interfaces-1",
    "page": "Set Interfaces",
    "title": "Set Interfaces",
    "category": "section",
    "text": "This section of the manual describes the interfaces for different set types. Every set that fits the description of an interface should also implement it. This helps in several ways:avoid code duplicates,\nprovide functions for many sets at once,\nallow changes in the source code without changing the API.The interface functions are outlined in the interface documentation. See Common Set Representations for implementations of the interfaces.note: Note\nThe naming convention is such that all interface names (with the exception of the main abstract type LazySet) should be preceded by Abstract.The following diagram shows the interface hierarchy.(Image: ../assets/interfaces.png)Pages = [\"interfaces.md\"]\nDepth = 4CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\n    using Compat.InteractiveUtils: subtypes\nend"
},

{
    "location": "lib/interfaces.html#LazySets.LazySet",
    "page": "Set Interfaces",
    "title": "LazySets.LazySet",
    "category": "type",
    "text": "LazySet{N}\n\nAbstract type for convex sets, i.e., sets characterized by a (possibly infinite) intersection of halfspaces, or equivalently, sets S such that for any two elements x y  S and 0  λ  1 it holds that λx + (1-λ)y  S.\n\nNotes\n\nLazySet types should be parameterized with a type N, typically N<:Real, for using different numeric types.\n\nEvery concrete LazySet must define the following functions:\n\nσ(d::AbstractVector{N}, S::LazySet{N}) where {N<:Real} – the support vector   of S in a given direction d; note that the numeric type N of d and   S must be identical; for some set types N may be more restrictive than   Real\ndim(S::LazySet)::Int – the ambient dimension of S\n\njulia> subtypes(LazySet)\n19-element Array{Any,1}:\n AbstractCentrallySymmetric\n AbstractPolytope\n CacheMinkowskiSum\n CartesianProduct\n CartesianProductArray\n ConvexHull\n ConvexHullArray\n EmptySet\n ExponentialMap\n ExponentialProjectionMap\n HPolyhedron\n HalfSpace\n Hyperplane\n Intersection\n IntersectionArray\n Line\n LinearMap\n MinkowskiSum\n MinkowskiSumArray\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySet-1",
    "page": "Set Interfaces",
    "title": "LazySet",
    "category": "section",
    "text": "Every convex set in this library implements this interface.LazySet"
},

{
    "location": "lib/interfaces.html#LazySets.support_vector",
    "page": "Set Interfaces",
    "title": "LazySets.support_vector",
    "category": "function",
    "text": "support_vector\n\nAlias for the support vector σ.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.ρ-Union{Tuple{N}, Tuple{AbstractArray{N,1},LazySet{N}}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.ρ",
    "category": "method",
    "text": "ρ(d::AbstractVector{N}, S::LazySet{N})::N where {N<:Real}\n\nEvaluate the support function of a set in a given direction.\n\nInput\n\nd – direction\nS – convex set\n\nOutput\n\nThe support function of the set S for the direction d.\n\nNotes\n\nThe numeric type of the direction and the set must be identical.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.support_function",
    "page": "Set Interfaces",
    "title": "LazySets.support_function",
    "category": "function",
    "text": "support_function\n\nAlias for the support function ρ.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Support-function-and-support-vector-1",
    "page": "Set Interfaces",
    "title": "Support function and support vector",
    "category": "section",
    "text": "Every LazySet type must define a function σ to compute the support vector.support_vector\nρ(::AbstractVector{N}, ::LazySet{N}) where {N<:Real}\nsupport_function"
},

{
    "location": "lib/interfaces.html#LinearAlgebra.norm-Tuple{LazySet,Real}",
    "page": "Set Interfaces",
    "title": "LinearAlgebra.norm",
    "category": "method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.radius-Tuple{LazySet,Real}",
    "page": "Set Interfaces",
    "title": "LazySets.radius",
    "category": "method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.diameter-Tuple{LazySet,Real}",
    "page": "Set Interfaces",
    "title": "LazySets.diameter",
    "category": "method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Tuple{LazySet{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(S::LazySet{N}) where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.:==-Tuple{LazySet,LazySet}",
    "page": "Set Interfaces",
    "title": "Base.:==",
    "category": "method",
    "text": "==(X::LazySet, Y::LazySet)\n\nReturn whether two LazySets of the same type are exactly equal by recursively comparing their fields until a mismatch is found.\n\nInput\n\nX – any LazySet\nY – another LazySet of the same type as X\n\nOutput\n\ntrue iff X is equal to Y.\n\nNotes\n\nThe check is purely syntactic and the sets need to have the same base type. I.e. X::VPolytope == Y::HPolytope returns false even if X and Y represent the same polytope. However X::HPolytope{Int64} == Y::HPolytope{Float64} is a valid comparison.\n\nExamples\n\njulia> HalfSpace([1], 1) == HalfSpace([1], 1)\ntrue\n\njulia> HalfSpace([1], 1) == HalfSpace([1.0], 1.0)\ntrue\n\njulia> Ball1([0.], 1.) == Ball2([0.], 1.)\nfalse\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Other-globally-defined-set-functions-1",
    "page": "Set Interfaces",
    "title": "Other globally defined set functions",
    "category": "section",
    "text": "norm(::LazySet, ::Real)\nradius(::LazySet, ::Real)\ndiameter(::LazySet, ::Real)\nan_element(::LazySet{Real})\n==(::LazySet, ::LazySet)"
},

{
    "location": "lib/interfaces.html#LazySets.CompactSet",
    "page": "Set Interfaces",
    "title": "LazySets.CompactSet",
    "category": "constant",
    "text": "CompactSet\n\nAn alias for compact set types.\n\nNotes\n\nMost lazy operations are not captured by this alias because whether their result is compact or not depends on the argument(s).\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.NonCompactSet",
    "page": "Set Interfaces",
    "title": "LazySets.NonCompactSet",
    "category": "constant",
    "text": "NonCompactSet\n\nAn alias for non-compact set types.\n\nNotes\n\nMost lazy operations are not captured by this alias because whether their result is non-compact or not depends on the argument(s).\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Aliases-for-set-types-1",
    "page": "Set Interfaces",
    "title": "Aliases for set types",
    "category": "section",
    "text": "CompactSet\nNonCompactSet"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractCentrallySymmetric",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractCentrallySymmetric",
    "category": "type",
    "text": "AbstractCentrallySymmetric{N<:Real} <: LazySet{N}\n\nAbstract type for centrally symmetric sets.\n\nNotes\n\nEvery concrete AbstractCentrallySymmetric must define the following functions:\n\ncenter(::AbstractCentrallySymmetric{N})::Vector{N} – return the center   point\n\njulia> subtypes(AbstractCentrallySymmetric)\n3-element Array{Any,1}:\n Ball2\n Ballp\n Ellipsoid\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.dim-Tuple{AbstractCentrallySymmetric}",
    "page": "Set Interfaces",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(S::AbstractCentrallySymmetric)::Int\n\nReturn the ambient dimension of a centrally symmetric set.\n\nInput\n\nS – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Union{Tuple{AbstractCentrallySymmetric{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(S::AbstractCentrallySymmetric{N})::Vector{N} where {N<:Real}\n\nReturn some element of a centrally symmetric set.\n\nInput\n\nS – centrally symmetric set\n\nOutput\n\nThe center of the centrally symmetric set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.isempty-Tuple{AbstractCentrallySymmetric}",
    "page": "Set Interfaces",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(S::AbstractCentrallySymmetric)::Bool\n\nReturn if a centrally symmetric set is empty or not.\n\nInput\n\nS – centrally symmetric set\n\nOutput\n\nfalse.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Centrally-symmetric-set-1",
    "page": "Set Interfaces",
    "title": "Centrally symmetric set",
    "category": "section",
    "text": "Centrally symmetric sets such as balls of different norms are characterized by a center. Note that there is a special interface combination Centrally symmetric polytope.AbstractCentrallySymmetricThis interface defines the following functions:dim(::AbstractCentrallySymmetric)\nan_element(::AbstractCentrallySymmetric{N}) where {N<:Real}\nisempty(::AbstractCentrallySymmetric)"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPolytope",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPolytope",
    "category": "type",
    "text": "AbstractPolytope{N<:Real} <: LazySet{N}\n\nAbstract type for polytopic sets, i.e., sets with finitely many flat facets, or equivalently, sets defined as an intersection of a finite number of halfspaces, or equivalently, sets with finitely many vertices.\n\nNotes\n\nEvery concrete AbstractPolytope must define the following functions:\n\nconstraints_list(::AbstractPolytope{N})::Vector{LinearConstraint{N}} –   return a list of all facet constraints\nvertices_list(::AbstractPolytope{N})::Vector{Vector{N}} – return a list of   all vertices\n\njulia> subtypes(AbstractPolytope)\n4-element Array{Any,1}:\n AbstractCentrallySymmetricPolytope\n AbstractPolygon\n HPolytope\n VPolytope\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.singleton_list-Union{Tuple{AbstractPolytope{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.singleton_list",
    "category": "method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic set as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.linear_map-Tuple{AbstractArray{T,2} where T,AbstractPolytope}",
    "page": "Set Interfaces",
    "title": "LazySets.linear_map",
    "category": "method",
    "text": "linear_map(M::AbstractMatrix, P::AbstractPolytope{N};\n           output_type::Type{<:LazySet}=VPolytope{N}) where {N<:Real}\n\nConcrete linear map of an abstract polytype.\n\nInput\n\nM           – matrix\nP           – abstract polytype\noutput_type – (optional, default: VPolytope) type of the result\n\nOutput\n\nA set of type output_type.\n\nAlgorithm\n\nThe linear map M is applied to each vertex of the given set P, obtaining a polytope in V-representation. Since some set representations (e.g. axis-aligned hyperrectangles) are not closed under linear maps, the default output is a VPolytope. If an output_type is given, the corresponding convert method is invoked.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.isempty-Union{Tuple{AbstractPolytope{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(P::AbstractPolytope{N})::Bool where {N<:Real}\n\nDetermine whether a polytope is empty.\n\nInput\n\nP – abstract polytope\n\nOutput\n\ntrue if the given polytope contains no vertices, and false otherwise.\n\nAlgorithm\n\nThis algorithm checks whether the vertices_list of the given polytope is empty or not.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Polytope-1",
    "page": "Set Interfaces",
    "title": "Polytope",
    "category": "section",
    "text": "A polytope has finitely many vertices (V-representation) resp. facets (H-representation). Note that there is a special interface combination Centrally symmetric polytope.AbstractPolytopeThis interface defines the following functions:singleton_list(::AbstractPolytope{N}) where {N<:Real}\nlinear_map(::AbstractMatrix, ::AbstractPolytope)\nisempty(::AbstractPolytope{N}) where {N<:Real}"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPolygon",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPolygon",
    "category": "type",
    "text": "AbstractPolygon{N<:Real} <: AbstractPolytope{N}\n\nAbstract type for polygons (i.e., 2D polytopes).\n\nNotes\n\nEvery concrete AbstractPolygon must define the following functions:\n\ntovrep(::AbstractPolygon{N})::VPolygon{N}         – transform into   V-representation\ntohrep(::AbstractPolygon{N})::AbstractHPolygon{N} – transform into   H-representation\n\njulia> subtypes(AbstractPolygon)\n2-element Array{Any,1}:\n AbstractHPolygon\n VPolygon\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.dim-Tuple{AbstractPolygon}",
    "page": "Set Interfaces",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(P::AbstractPolygon)::Int\n\nReturn the ambient dimension of a polygon.\n\nInput\n\nP – polygon\n\nOutput\n\nThe ambient dimension of the polygon, which is 2.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.linear_map-Union{Tuple{N}, Tuple{AbstractArray{T,2} where T,AbstractPolygon{N}}} where N",
    "page": "Set Interfaces",
    "title": "LazySets.linear_map",
    "category": "method",
    "text": "linear_map(M::AbstractMatrix, P::AbstractPolygon{N};\n           output_type::Type{<:LazySet}=typeof(P)) where {N}\n\nConcrete linear map of an abstract polygon.\n\nInput\n\nM           – matrix\nP           – abstract polygon\noutput_type – (optional, default: type of P) type of the result\n\nOutput\n\nA set of type output_type.\n\nAlgorithm\n\nThe linear map M is applied to each vertex of the given set P, obtaining a polygon in V-representation. Since polygons are closed under linear map, by default MP is converted to the concrete type of P. If an output_type is given, the corresponding convert method is invoked.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Polygon-1",
    "page": "Set Interfaces",
    "title": "Polygon",
    "category": "section",
    "text": "A polygon is a two-dimensional polytope.AbstractPolygonThis interface defines the following functions:dim(P::AbstractPolygon)\nlinear_map(::AbstractMatrix, P::AbstractPolygon{N}) where N"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractHPolygon",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractHPolygon",
    "category": "type",
    "text": "AbstractHPolygon{N<:Real} <: AbstractPolygon{N}\n\nAbstract type for polygons in H-representation (i.e., constraints).\n\nNotes\n\nEvery concrete AbstractHPolygon must have the following fields:\n\nconstraints::Vector{LinearConstraint{N}} – the constraints\n\nNew subtypes should be added to the convert method in order to be convertible.\n\njulia> subtypes(AbstractHPolygon)\n2-element Array{Any,1}:\n HPolygon\n HPolygonOpt\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Union{Tuple{AbstractHPolygon{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(P::AbstractHPolygon{N})::Vector{N} where {N<:Real}\n\nReturn some element of a polygon in constraint representation.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nA vertex of the polygon in constraint representation (the first one in the order of the constraints).\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.:∈-Tuple{AbstractArray{Real,1},AbstractHPolygon{Real}}",
    "page": "Set Interfaces",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, P::AbstractHPolygon{N})::Bool where {N<:Real}\n\nCheck whether a given 2D point is contained in a polygon in constraint representation.\n\nInput\n\nx – two-dimensional point/vector\nP – polygon in constraint representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation checks if the point lies on the outside of each edge.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.rand-Union{Tuple{Type{HPOLYGON}}, Tuple{HPOLYGON}} where HPOLYGON<:AbstractHPolygon",
    "page": "Set Interfaces",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{HPOLYGON}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing,\n     [num_constraints]::Int=-1\n    )::HPOLYGON{N} where {HPOLYGON<:AbstractHPolygon}\n\nCreate a random polygon in constraint representation.\n\nInput\n\nHPOLYGON        – type for dispatch\nN               – (optional, default: Float64) numeric type\ndim             – (optional, default: 2) dimension\nrng             – (optional, default: GLOBAL_RNG) random number generator\nseed            – (optional, default: nothing) seed for reseeding\nnum_constraints – (optional, default: -1) number of constraints of the                      polygon (must be 3 or bigger; see comment below)\n\nOutput\n\nA random polygon in constraint representation.\n\nAlgorithm\n\nWe create a random polygon in vertex representation and convert it to constraint representation. See rand(::Type{VPolygon}). For non-flat polygons the number of vertices and the number of constraints are identical.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.vertices_list-Tuple{AbstractHPolygon{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(P::AbstractHPolygon{N},\n              apply_convex_hull::Bool=false\n             )::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a polygon in constraint representation.\n\nInput\n\nP                 – polygon in constraint representation\napply_convex_hull – (optional, default: false) to post process or not the                        intersection of constraints with a convex hull\n\nOutput\n\nList of vertices.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.tohrep-Tuple{AbstractHPolygon{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.tohrep",
    "category": "method",
    "text": "tohrep(P::AbstractHPolygon{N})::AbstractHPolygon{N} where {N<:Real}\n\nBuild a contraint representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe identity, i.e., the same polygon instance.\n\n\n\n\n\ntohrep(P::HPoly{N}) where {N}\n\nReturn a constraint representation of the given polyhedron in constraint representation (no-op).\n\nInput\n\nP – polyhedron in constraint representation\n\nOutput\n\nThe same polyhedron instance.\n\n\n\n\n\ntohrep(P::VPolygon{N}, ::Type{HPOLYGON}=HPolygon\n      )::AbstractHPolygon{N} where {N<:Real, HPOLYGON<:AbstractHPolygon}\n\nBuild a constraint representation of the given polygon.\n\nInput\n\nP        – polygon in vertex representation\nHPOLYGON – (optional, default: HPolygon) type of target polygon\n\nOutput\n\nThe same polygon but in constraint representation, an AbstractHPolygon.\n\nAlgorithm\n\nThe algorithms consists of adding an edge for each consecutive pair of vertices. Since the vertices are already ordered in counter-clockwise fashion (CWW), the constraints will be sorted automatically (CCW) if we start with the first edge between the first and second vertex.\n\n\n\n\n\ntohrep(P::VPolytope{N}; [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polytope in V-representation to a polytope in H-representation.\n\nInput\n\nP          – polytope in vertex representation\nbackend    – (optional, default: default_polyhedra_backend(P, N)) the polyhedral                 computations backend,                 see Polyhedra\'s documentation                 for further information\n\nOutput\n\nThe HPolytope which is the constraint representation of the given polytope in vertex representation.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.tovrep-Tuple{AbstractHPolygon{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.tovrep",
    "category": "method",
    "text": "tovrep(P::AbstractHPolygon{N})::VPolygon{N} where {N<:Real}\n\nBuild a vertex representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe same polygon but in vertex representation, a VPolygon.\n\n\n\n\n\ntovrep(P::HPoly{N};\n      [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polyhedron in H-representation to a polytope in V-representation.\n\nInput\n\nP          – polyhedron in constraint representation\nbackend    – (optional, default: default_polyhedra_backend(P, N))                 the polyhedral computations backend\n\nOutput\n\nThe VPolytope which is the vertex representation of the given polyhedron in constraint representation.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.addconstraint!-Tuple{AbstractHPolygon{Real},LazySets.HalfSpace{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.addconstraint!",
    "category": "method",
    "text": "addconstraint!(P::AbstractHPolygon{N},\n               constraint::LinearConstraint{N};\n               linear_search::Bool=(length(P.constraints) < BINARY_SEARCH_THRESHOLD)\n              )::Nothing where {N<:Real}\n\nAdd a linear constraint to a polygon in constraint representation, keeping the constraints sorted by their normal directions.\n\nInput\n\nP          – polygon in constraint representation\nconstraint – linear constraint to add\n\nOutput\n\nNothing.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.constraints_list-Tuple{AbstractHPolygon{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(P::AbstractHPolygon{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a polygon in H-representation.\n\nInput\n\nP – polygon in H-representation\n\nOutput\n\nThe list of constraints of the polygon.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#HPolygon-1",
    "page": "Set Interfaces",
    "title": "HPolygon",
    "category": "section",
    "text": "An HPolygon is a polygon in H-representation (or constraint representation).AbstractHPolygonThis interface defines the following functions:an_element(::AbstractHPolygon{N}) where {N<:Real}\n∈(::AbstractVector{Real}, ::AbstractHPolygon{Real})\nrand(::Type{HPOLYGON}) where {HPOLYGON<:AbstractHPolygon}\nvertices_list(::AbstractHPolygon{Real})\ntohrep(::AbstractHPolygon{Real})\ntovrep(::AbstractHPolygon{Real})\naddconstraint!(::AbstractHPolygon{Real}, ::LinearConstraint{Real})\nconstraints_list(::AbstractHPolygon{Real})"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractCentrallySymmetricPolytope",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractCentrallySymmetricPolytope",
    "category": "type",
    "text": "AbstractCentrallySymmetricPolytope{N<:Real} <: AbstractPolytope{N}\n\nAbstract type for centrally symmetric, polytopic sets. It combines the AbstractCentrallySymmetric and AbstractPolytope interfaces. Such a type combination is necessary as long as Julia does not support multiple inheritance.\n\nNotes\n\nEvery concrete AbstractCentrallySymmetricPolytope must define the following functions:\n\nfrom AbstractCentrallySymmetric:\ncenter(::AbstractCentrallySymmetricPolytope{N})::Vector{N} – return the  center point\nfrom AbstractPolytope:\nvertices_list(::AbstractCentrallySymmetricPolytope{N})::Vector{Vector{N}}  – return a list of all vertices\n\njulia> subtypes(AbstractCentrallySymmetricPolytope)\n4-element Array{Any,1}:\n AbstractHyperrectangle\n Ball1\n LineSegment\n Zonotope\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.dim-Tuple{AbstractCentrallySymmetricPolytope}",
    "page": "Set Interfaces",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(P::AbstractCentrallySymmetricPolytope)::Int\n\nReturn the ambient dimension of a centrally symmetric, polytopic set.\n\nInput\n\nP – centrally symmetric, polytopic set\n\nOutput\n\nThe ambient dimension of the polytopic set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Union{Tuple{AbstractCentrallySymmetricPolytope{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(P::AbstractCentrallySymmetricPolytope{N})::Vector{N}\n    where {N<:Real}\n\nReturn some element of a centrally symmetric polytope.\n\nInput\n\nP – centrally symmetric polytope\n\nOutput\n\nThe center of the centrally symmetric polytope.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.isempty-Tuple{AbstractCentrallySymmetricPolytope}",
    "page": "Set Interfaces",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(P::AbstractCentrallySymmetricPolytope)::Bool\n\nReturn if a centrally symmetric, polytopic set is empty or not.\n\nInput\n\nP – centrally symmetric, polytopic set\n\nOutput\n\nfalse.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Centrally-symmetric-polytope-1",
    "page": "Set Interfaces",
    "title": "Centrally symmetric polytope",
    "category": "section",
    "text": "A centrally symmetric polytope is a combination of two other interfaces: Centrally symmetric set and Polytope.AbstractCentrallySymmetricPolytopeThis interface defines the following functions:dim(::AbstractCentrallySymmetricPolytope)\nan_element(::AbstractCentrallySymmetricPolytope{N}) where {N<:Real}\nisempty(::AbstractCentrallySymmetricPolytope)"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractHyperrectangle",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractHyperrectangle",
    "category": "type",
    "text": "AbstractHyperrectangle{N<:Real} <: AbstractCentrallySymmetricPolytope{N}\n\nAbstract type for hyperrectangular sets.\n\nNotes\n\nEvery concrete AbstractHyperrectangle must define the following functions:\n\nradius_hyperrectangle(::AbstractHyperrectangle{N})::Vector{N} – return the   hyperrectangle\'s radius, which is a full-dimensional vector\nradius_hyperrectangle(::AbstractHyperrectangle{N}, i::Int)::N – return the   hyperrectangle\'s radius in the i-th dimension\n\njulia> subtypes(AbstractHyperrectangle)\n5-element Array{Any,1}:\n AbstractSingleton\n BallInf\n Hyperrectangle\n Interval\n SymmetricIntervalHull\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LinearAlgebra.norm-Tuple{AbstractHyperrectangle,Real}",
    "page": "Set Interfaces",
    "title": "LinearAlgebra.norm",
    "category": "method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\n\n\nnorm(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the norm of a hyperrectangular set.\n\nThe norm of a hyperrectangular set is defined as the norm of the enclosing ball, of the given p-norm, of minimal volume that is centered in the origin.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\nAlgorithm\n\nRecall that the norm is defined as\n\n X  = max_x  X  x _p = max_x  textvertices(X)  x _p\n\nThe last equality holds because the optimum of a convex function over a polytope is attained at one of its vertices.\n\nThis implementation uses the fact that the maximum is achieved in the vertex c + textdiag(textsign(c)) r, for any p-norm, hence it suffices to take the p-norm of this particular vertex. This statement is proved below. Note that, in particular, there is no need to compute the p-norm for each vertex, which can be very expensive. \n\nIf X is an axis-aligned hyperrectangle and the n-dimensional vectors center and radius of the hyperrectangle are denoted c and r respectively, then reasoning on the 2^n vertices we have that:\n\nmax_x  textvertices(X)  x _p = max_α_1  α_n  -1 1 (c_1 + α_1 r_1^p +  + c_n + α_n r_n^p)^1p\n\nThe function x  x^p, p  0, is monotonically increasing and thus the maximum of each term c_i + α_i r_i^p is given by c_i + textsign(c_i) r_i^p for each i. Hence, x^* = textargmax_x  X  x _p is the vertex c + textdiag(textsign(c)) r.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.radius-Tuple{AbstractHyperrectangle,Real}",
    "page": "Set Interfaces",
    "title": "LazySets.radius",
    "category": "method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\n\n\nradius(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the radius of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center. It is the same for all corners of a hyperrectangular set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.σ-Tuple{AbstractArray{Real,1},AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}) where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.:∈-Tuple{AbstractArray{Real,1},AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, H::AbstractHyperrectangle{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperrectangular set.\n\nInput\n\nx – point/vector\nH – hyperrectangular set\n\nOutput\n\ntrue iff x  H.\n\nAlgorithm\n\nLet H be an n-dimensional hyperrectangular set, c_i and r_i be the box\'s center and radius and x_i be the vector x in dimension i, respectively. Then x  H iff c_i - x_i  r_i for all i=1n.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.vertices_list-Tuple{AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(H::AbstractHyperrectangle{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of vertices.\n\nNotes\n\nFor high dimensions, it is preferable to develop a vertex_iterator approach.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.constraints_list-Tuple{AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(H::AbstractHyperrectangle{N})::Vector{LinearConstraint{N}}\n    where {N<:Real}\n\nReturn the list of constraints of an axis-aligned hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of linear constraints.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.high-Tuple{AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.high",
    "category": "method",
    "text": "high(H::AbstractHyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the higher coordinates of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA vector with the higher coordinates of the hyperrectangular set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.low-Tuple{AbstractHyperrectangle{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.low",
    "category": "method",
    "text": "low(H::AbstractHyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the lower coordinates of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA vector with the lower coordinates of the hyperrectangular set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Hyperrectangle-1",
    "page": "Set Interfaces",
    "title": "Hyperrectangle",
    "category": "section",
    "text": "A hyperrectangle is a special centrally symmetric polytope with axis-aligned facets.AbstractHyperrectangleThis interface defines the following functions:norm(::AbstractHyperrectangle, ::Real)\nradius(::AbstractHyperrectangle, ::Real)\nσ(::AbstractVector{Real}, ::AbstractHyperrectangle{Real})\n∈(::AbstractVector{Real}, ::AbstractHyperrectangle{Real})\nvertices_list(::AbstractHyperrectangle{Real})\nconstraints_list(::AbstractHyperrectangle{Real})\nhigh(::AbstractHyperrectangle{Real})\nlow(::AbstractHyperrectangle{Real})"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractSingleton",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractSingleton",
    "category": "type",
    "text": "AbstractSingleton{N<:Real} <: AbstractHyperrectangle{N}\n\nAbstract type for sets with a single value.\n\nNotes\n\nEvery concrete AbstractSingleton must define the following functions:\n\nelement(::AbstractSingleton{N})::Vector{N} – return the single element\nelement(::AbstractSingleton{N}, i::Int)::N – return the single element\'s   entry in the i-th dimension\n\njulia> subtypes(AbstractSingleton)\n2-element Array{Any,1}:\n Singleton\n ZeroSet\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.σ-Union{Tuple{N}, Tuple{AbstractArray{N,1},AbstractSingleton{N}}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, S::AbstractSingleton{N}) where {N<:Real}\n\nReturn the support vector of a set with a single value.\n\nInput\n\nd – direction\nS – set with a single value\n\nOutput\n\nThe support vector, which is the set\'s vector itself, irrespective of the given direction.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Base.:∈-Union{Tuple{N}, Tuple{AbstractArray{N,1},AbstractSingleton{N}}} where N<:Real",
    "page": "Set Interfaces",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, S::AbstractSingleton{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a set with a single value.\n\nInput\n\nx – point/vector\nS – set with a single value\n\nOutput\n\ntrue iff x  S.\n\nNotes\n\nThis implementation performs an exact comparison, which may be insufficient with floating point computations.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Union{Tuple{AbstractSingleton{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(S::LazySet{N}) where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\n\n\nan_element(P::AbstractCentrallySymmetricPolytope{N})::Vector{N}\n    where {N<:Real}\n\nReturn some element of a centrally symmetric polytope.\n\nInput\n\nP – centrally symmetric polytope\n\nOutput\n\nThe center of the centrally symmetric polytope.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.center-Tuple{AbstractSingleton{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the center of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe only element of the set.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.vertices_list-Union{Tuple{AbstractSingleton{N}}, Tuple{N}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(S::AbstractSingleton{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nA list containing only a single vertex.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.radius_hyperrectangle-Tuple{AbstractSingleton{Real}}",
    "page": "Set Interfaces",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a set with a single value in every dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe zero vector.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.radius_hyperrectangle-Tuple{AbstractSingleton{Real},Int64}",
    "page": "Set Interfaces",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a set with a single value in a given dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nZero.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.linear_map-Union{Tuple{N}, Tuple{AbstractArray{T,2} where T,AbstractSingleton{N}}} where N<:Real",
    "page": "Set Interfaces",
    "title": "LazySets.linear_map",
    "category": "method",
    "text": "linear_map(M::AbstractMatrix, S::AbstractSingleton{N}) where {N<:Real}\n\nConcrete linear map of an abstract singleton.\n\nInput\n\nM – matrix\nS – abstract singleton\n\nOutput\n\nThe abstract singleton of the same type of S obtained by applying the linear map to the element in S.\n\n\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Singleton-1",
    "page": "Set Interfaces",
    "title": "Singleton",
    "category": "section",
    "text": "A singleton is a special hyperrectangle consisting of only one point.AbstractSingletonThis interface defines the following functions:σ(::AbstractVector{N}, ::AbstractSingleton{N}) where {N<:Real}\n∈(::AbstractVector{N}, ::AbstractSingleton{N}) where {N<:Real}\nan_element(::AbstractSingleton{N}) where {N<:Real}\ncenter(::AbstractSingleton{Real})\nvertices_list(::AbstractSingleton{N}) where {N<:Real}\nradius_hyperrectangle(::AbstractSingleton{Real})\nradius_hyperrectangle(::AbstractSingleton{Real}, ::Int)\nlinear_map(::AbstractMatrix, ::AbstractSingleton{N}) where {N<:Real}"
},

{
    "location": "lib/representations.html#",
    "page": "Common Set Representations",
    "title": "Common Set Representations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/representations.html#Common-Set-Representations-1",
    "page": "Common Set Representations",
    "title": "Common Set Representations",
    "category": "section",
    "text": "This section of the manual describes the basic set representation types.Pages = [\"representations.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\n    using Compat.SparseArrays, Compat.LinearAlgebra\nend"
},

{
    "location": "lib/representations.html#Balls-1",
    "page": "Common Set Representations",
    "title": "Balls",
    "category": "section",
    "text": ""
},

{
    "location": "lib/representations.html#LazySets.Ball2",
    "page": "Common Set Representations",
    "title": "LazySets.Ball2",
    "category": "type",
    "text": "Ball2{N<:AbstractFloat} <: AbstractCentrallySymmetric{N}\n\nType that represents a ball in the 2-norm.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a real scalar ( 0)\n\nNotes\n\nMathematically, a ball in the 2-norm is defined as the set\n\nmathcalB_2^n(c r) =  x  mathbbR^n   x - c _2  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _2 denotes the Euclidean norm (also known as 2-norm), defined as  x _2 = left( sumlimits_i=1^n x_i^2 right)^12 for any x  mathbbR^n.\n\nExamples\n\nCreate a five-dimensional ball B in the 2-norm centered at the origin with radius 0.5:\n\njulia> B = Ball2(zeros(5), 0.5)\nBall2{Float64}([0.0, 0.0, 0.0, 0.0, 0.0], 0.5)\njulia> dim(B)\n5\n\nEvaluate B\'s support vector in the direction 12345:\n\njulia> σ([1.,2.,3.,4.,5.], B)\n5-element Array{Float64,1}:\n 0.06741998624632421\n 0.13483997249264842\n 0.20225995873897262\n 0.26967994498529685\n 0.3370999312316211\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{AbstractFloat,1},Ball2{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, B::Ball2{N}) where {N<:AbstractFloat}\n\nReturn the support vector of a 2-norm ball in a given direction.\n\nInput\n\nd – direction\nB – ball in the 2-norm\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the origin is returned.\n\nNotes\n\nLet c and r be the center and radius of a ball B in the 2-norm, respectively. For nonzero direction d we have\n\nσ_B(d) = c + r fracdd_2\n\nThis function requires computing the 2-norm of the input direction, which is performed in the given precision of the numeric datatype of both the direction and the set. Exact inputs are not supported.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{AbstractFloat,1},Ball2{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, B::Ball2{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in a ball in the 2-norm.\n\nInput\n\nx – point/vector\nB – ball in the 2-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the 2-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff left( _i=1^n c_i - x_i^2 right)^12  r.\n\nExamples\n\njulia> B = Ball2([1., 1.], sqrt(0.5))\nBall2{Float64}([1.0, 1.0], 0.7071067811865476)\njulia> ∈([.5, 1.6], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Ball2}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(B::Ball2{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of a ball in the 2-norm.\n\nInput\n\nB – ball in the 2-norm\n\nOutput\n\nThe center of the ball in the 2-norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Ball2}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Ball2}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Ball2{N}\n\nCreate a random ball in the 2-norm.\n\nInput\n\nBall2 – type for dispatch\nN     – (optional, default: Float64) numeric type\ndim   – (optional, default: 2) dimension\nrng   – (optional, default: GLOBAL_RNG) random number generator\nseed  – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random ball in the 2-norm.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the radius is nonnegative.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Euclidean-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Euclidean norm ball",
    "category": "section",
    "text": "Ball2\nσ(::AbstractVector{AbstractFloat}, ::Ball2{AbstractFloat})\n∈(::AbstractVector{AbstractFloat}, ::Ball2{AbstractFloat})\ncenter(::Ball2)\nrand(::Type{Ball2})Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractCentrallySymmetric:dim\nisempty\nan_element"
},

{
    "location": "lib/representations.html#LazySets.BallInf",
    "page": "Common Set Representations",
    "title": "LazySets.BallInf",
    "category": "type",
    "text": "BallInf{N<:Real} <: AbstractHyperrectangle{N}\n\nType that represents a ball in the infinity norm.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a real scalar ( 0)\n\nNotes\n\nMathematically, a ball in the infinity norm is defined as the set\n\nmathcalB_^n(c r) =  x  mathbbR^n   x - c _  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _ denotes the infinity norm, defined as  x _ = maxlimits_i=1n vert x_i vert for any x  mathbbR^n.\n\nExamples\n\nCreate the two-dimensional unit ball and compute its support function along the positive x=y direction:\n\njulia> B = BallInf(zeros(2), 1.0)\nBallInf{Float64}([0.0, 0.0], 1.0)\njulia> dim(B)\n2\njulia> ρ([1., 1.], B)\n2.0\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{BallInf}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(B::BallInf{N})::Vector{N} where {N<:Real}\n\nReturn the center of a ball in the infinity norm.\n\nInput\n\nB – ball in the infinity norm\n\nOutput\n\nThe center of the ball in the infinity norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius-Tuple{BallInf,Real}",
    "page": "Common Set Representations",
    "title": "LazySets.radius",
    "category": "method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\n\n\nradius(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the radius of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center. It is the same for all corners of a hyperrectangular set.\n\n\n\n\n\nradius(B::BallInf, [p]::Real=Inf)::Real\n\nReturn the radius of a ball in the infinity norm.\n\nInput\n\nB – ball in the infinity norm\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{BallInf}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(B::BallInf{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a infinity norm ball, which is the same in every dimension.\n\nInput\n\nB – infinity norm ball\n\nOutput\n\nThe box radius of the ball in the infinity norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{BallInf,Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(B::BallInf{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a infinity norm ball in a given dimension.\n\nInput\n\nB – infinity norm ball\n\nOutput\n\nThe box radius of the ball in the infinity norm in the given dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{BallInf}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{BallInf}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::BallInf{N}\n\nCreate a random ball in the infinity norm.\n\nInput\n\nBallInf – type for dispatch\nN       – (optional, default: Float64) numeric type\ndim     – (optional, default: 2) dimension\nrng     – (optional, default: GLOBAL_RNG) random number generator\nseed    – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random ball in the infinity norm.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the radius is nonnegative.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Infinity-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Infinity norm ball",
    "category": "section",
    "text": "BallInf\ncenter(::BallInf)\nradius(::BallInf, ::Real)\nradius_hyperrectangle(::BallInf)\nradius_hyperrectangle(::BallInf, ::Int)\nrand(::Type{BallInf})Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_list\nlinear_mapInherited from AbstractCentrallySymmetricPolytope:dim\nisempty\nan_elementInherited from AbstractHyperrectangle:σ\n∈\nnorm\nvertices_list\nhigh\nlow"
},

{
    "location": "lib/representations.html#LazySets.Ball1",
    "page": "Common Set Representations",
    "title": "LazySets.Ball1",
    "category": "type",
    "text": "Ball1{N<:Real} <: AbstractCentrallySymmetricPolytope{N}\n\nType that represents a ball in the 1-norm, also known as Manhattan or Taxicab norm.\n\nIt is defined as the set\n\nmathcalB_1^n(c r) =  x  mathbbR^n  _i=1^n c_i - x_i  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a scalar ( 0)\n\nExamples\n\nUnit ball in the 1-norm in the plane:\n\njulia> B = Ball1(zeros(2), 1.)\nBall1{Float64}([0.0, 0.0], 1.0)\njulia> dim(B)\n2\n\nWe evaluate the support vector in the East direction:\n\njulia> σ([0.,1], B)\n2-element Array{Float64,1}:\n 0.0\n 1.0\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},Ball1{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, B::Ball1{N}) where {N<:Real}\n\nReturn the support vector of a ball in the 1-norm in a given direction.\n\nInput\n\nd – direction\nB – ball in the 1-norm\n\nOutput\n\nSupport vector in the given direction.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},Ball1{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, B::Ball1{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a ball in the 1-norm.\n\nInput\n\nx – point/vector\nB – ball in the 1-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the 1-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff _i=1^n c_i - x_i  r.\n\nExamples\n\njulia> B = Ball1([1., 1.], 1.);\n\njulia> ∈([.5, -.5], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{Ball1}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(B::Ball1{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a ball in the 1-norm.\n\nInput\n\nB – ball in the 1-norm\n\nOutput\n\nA list containing the vertices of the ball in the 1-norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Ball1}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(B::Ball1{N})::Vector{N} where {N<:Real}\n\nReturn the center of a ball in the 1-norm.\n\nInput\n\nB – ball in the 1-norm\n\nOutput\n\nThe center of the ball in the 1-norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Ball1}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Ball1}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Ball1{N}\n\nCreate a random ball in the 1-norm.\n\nInput\n\nBall1 – type for dispatch\nN     – (optional, default: Float64) numeric type\ndim   – (optional, default: 2) dimension\nrng   – (optional, default: GLOBAL_RNG) random number generator\nseed  – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random ball in the 1-norm.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the radius is nonnegative.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Tuple{Ball1}",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(P::Ball1{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a ball in the 1-norm.\n\nInput\n\nB – ball in the 1-norm\n\nOutput\n\nThe list of constraints of the ball.\n\nAlgorithm\n\nThe constraints can be defined as d_i^T (x-c)  r for all d_i, where d_i is a vector with elements 1 or -1 in n dimensions. To span all possible d_i, the function Iterators.product is used.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Manhattan-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Manhattan norm ball",
    "category": "section",
    "text": "Ball1\nσ(::AbstractVector{Real}, ::Ball1{Real})\n∈(::AbstractVector{Real}, ::Ball1{Real})\nvertices_list(::Ball1)\ncenter(::Ball1)\nrand(::Type{Ball1})\nconstraints_list(::Ball1)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:singleton_list\nlinear_mapInherited from AbstractCentrallySymmetricPolytope:dim\nisempty\nan_element"
},

{
    "location": "lib/representations.html#LazySets.Ballp",
    "page": "Common Set Representations",
    "title": "LazySets.Ballp",
    "category": "type",
    "text": "Ballp{N<:AbstractFloat} <: AbstractCentrallySymmetric{N}\n\nType that represents a ball in the p-norm, for 1  p  .\n\nIt is defined as the set\n\nmathcalB_p^n(c r) =  x  mathbbR^n   x - c _p  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _p for 1  p   denotes the vector p-norm, defined as  x _p = left( sumlimits_i=1^n x_i^p right)^1p for any x  mathbbR^n.\n\nFields\n\np      – norm as a real scalar\ncenter – center of the ball as a real vector\nradius – radius of the ball as a scalar ( 0)\n\nNotes\n\nThe special cases p=1, p=2 and p= fall back to the specialized types Ball1, Ball2 and BallInf, respectively.\n\nExamples\n\nA five-dimensional ball in the p=32 norm centered at the origin of radius 0.5:\n\njulia> B = Ballp(3/2, zeros(5), 0.5)\nBallp{Float64}(1.5, [0.0, 0.0, 0.0, 0.0, 0.0], 0.5)\njulia> dim(B)\n5\n\nWe evaluate the support vector in direction 125:\n\njulia> σ([1., 2, 3, 4, 5], B)\n5-element Array{Float64,1}:\n 0.013516004434607558\n 0.05406401773843023\n 0.12164403991146802\n 0.21625607095372093\n 0.33790011086518895\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{AbstractFloat,1},Ballp{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, B::Ballp{N}) where {N<:AbstractFloat}\n\nReturn the support vector of a Ballp in a given direction.\n\nInput\n\nd – direction\nB – ball in the p-norm\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the center of the ball is returned.\n\nAlgorithm\n\nThe support vector of the unit ball in the p-norm along direction d is:\n\nσ_mathcalB_p^n(0 1)(d) = dfractildevtildev_q\n\nwhere tildev_i = fracd_i^qd_i if d_i  0 and tildev_i = 0 otherwise, for all i=1n, and q is the conjugate number of p. By the affine transformation x = rtildex + c, one obtains that the support vector of mathcalB_p^n(c r) is\n\nσ_mathcalB_p^n(c r)(d) = dfracvv_q\n\nwhere v_i = c_i + rfracd_i^qd_i if d_i  0 and v_i = 0 otherwise, for all i = 1  n.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{AbstractFloat,1},Ballp{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, B::Ballp{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in a ball in the p-norm.\n\nInput\n\nx – point/vector\nB – ball in the p-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the p-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff left( _i=1^n c_i - x_i^p right)^1p  r.\n\nExamples\n\njulia> B = Ballp(1.5, [1., 1.], 1.)\nBallp{Float64}(1.5, [1.0, 1.0], 1.0)\njulia> ∈([.5, -.5], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Ballp}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(B::Ballp{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of a ball in the p-norm.\n\nInput\n\nB – ball in the p-norm\n\nOutput\n\nThe center of the ball in the p-norm.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Ballp}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Ballp}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Ballp{N}\n\nCreate a random ball in the p-norm.\n\nInput\n\nBallp – type for dispatch\nN     – (optional, default: Float64) numeric type\ndim   – (optional, default: 2) dimension\nrng   – (optional, default: GLOBAL_RNG) random number generator\nseed  – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random ball in the p-norm.\n\nAlgorithm\n\nThe center and radius are normally distributed with mean 0 and standard deviation 1. Additionally, the radius is nonnegative. The p-norm is a normally distributed number ≥ 1 with mean 1 and standard deviation 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#p-norm-ball-1",
    "page": "Common Set Representations",
    "title": "p-norm ball",
    "category": "section",
    "text": "Ballp\nσ(::AbstractVector{AbstractFloat}, ::Ballp{AbstractFloat})\n∈(::AbstractVector{AbstractFloat}, ::Ballp{AbstractFloat})\ncenter(::Ballp)\nrand(::Type{Ballp})Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractCentrallySymmetric:dim\nisempty\nan_element"
},

{
    "location": "lib/representations.html#LazySets.Ellipsoid",
    "page": "Common Set Representations",
    "title": "LazySets.Ellipsoid",
    "category": "type",
    "text": "Ellipsoid{N<:AbstractFloat} <:  AbstractCentrallySymmetric{N}\n\nType that represents an ellipsoid.\n\nIt is defined as the set\n\nE = left x  mathbbR^n  (x-c)Q^-1(x-c)  1 right\n\nwhere c in mathbbR^n is its center and Q in mathbbR^nn its shape matrix, which should be a positive definite matrix. An ellipsoid can also be characterized as the image of a Euclidean ball by an invertible linear transformation. It is the higher-dimensional generalization of an ellipse.\n\nFields\n\ncenter       – center of the ellipsoid\nshape matrix – real positive definite matrix, i.e. it is equal to its transpose                   and x^mathrmTQx  0 for all nonzero x\n\nExamples\n\nIf the center is not specified, it is assumed that the center is the origin. For instance, a 3D ellipsoid with center at the origin and the shape matrix being the identity can be created with:\n\njulia> E = Ellipsoid(Matrix{Float64}(I, 3, 3))\nEllipsoid{Float64}([0.0, 0.0, 0.0], [1.0 0.0 0.0; 0.0 1.0 0.0; 0.0 0.0 1.0])\n\njulia> dim(E)\n3\n\njulia> an_element(E)\n3-element Array{Float64,1}:\n 0.0\n 0.0\n 0.0\n\nThis ellipsoid corresponds to the unit Euclidean ball. Let\'s evaluate its support vector in a given direction:\n\njulia> σ(ones(3), E)\n3-element Array{Float64,1}:\n 0.5773502691896258\n 0.5773502691896258\n 0.5773502691896258\n\nA two-dimensional ellipsoid with given center and shape matrix:\n\njulia> E = Ellipsoid(ones(2), Diagonal([2.0, 0.5]))\nEllipsoid{Float64}([1.0, 1.0], [2.0 0.0; 0.0 0.5])\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{AbstractFloat,1},Ellipsoid{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, E::Ellipsoid{N}) where {N<:AbstractFloat}\n\nReturn the support vector of an ellipsoid in a given direction.\n\nInput\n\nd – direction\nE – ellipsoid\n\nOutput\n\nSupport vector in the given direction.\n\nAlgorithm\n\nLet E be an ellipsoid of center c and shape matrix Q = BB^mathrmT. Its support vector along direction d can be deduced from that of the unit Euclidean ball mathcalB_2 using the algebraic relations for the support vector,\n\nσ_BmathcalB_2  c(d) = c + Bσ_mathcalB_2 (B^mathrmT d)\n= c + dfracQdsqrtd^mathrmTQ d\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{AbstractFloat,1},Ellipsoid{AbstractFloat}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, E::Ellipsoid{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in an ellipsoid.\n\nInput\n\nx – point/vector\nE – ellipsoid\n\nOutput\n\ntrue iff x ∈ E.\n\nAlgorithm\n\nThe point x belongs to the ellipsoid of center c and shape matrix Q if and only if\n\n(x-c)^mathrmT Q^-1 (x-c)  1\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Ellipsoid}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Ellipsoid}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Ellipsoid{N}\n\nCreate a random ellipsoid.\n\nInput\n\nEllipsoid – type for dispatch\nN         – (optional, default: Float64) numeric type\ndim       – (optional, default: 2) dimension\nrng       – (optional, default: GLOBAL_RNG) random number generator\nseed      – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random ellipsoid.\n\nAlgorithm\n\nThe center is a normally distributed vector with entries of mean 0 and standard deviation 1.\n\nThe idea for the shape matrix comes from here. The matrix is symmetric positive definite, but also diagonally dominant.\n\nQ =  rac12(S + S^T) + nI\n\nwhere n = dim (defaults to 2), and S is a n times n random matrix whose coefficients are uniformly distributed in the interval -1 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Ellipsoid}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(E::Ellipsoid{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of the ellipsoid.\n\nInput\n\nE – ellipsoid\n\nOutput\n\nThe center of the ellipsoid.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Ellipsoid-1",
    "page": "Common Set Representations",
    "title": "Ellipsoid",
    "category": "section",
    "text": "Ellipsoid\nσ(::AbstractVector{AbstractFloat}, ::Ellipsoid{AbstractFloat})\n∈(::AbstractVector{AbstractFloat}, ::Ellipsoid{AbstractFloat})\nrand(::Type{Ellipsoid})\ncenter(::Ellipsoid)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractCentrallySymmetric:dim\nisempty\nan_element"
},

{
    "location": "lib/representations.html#LazySets.EmptySet",
    "page": "Common Set Representations",
    "title": "LazySets.EmptySet",
    "category": "type",
    "text": "EmptySet{N<:Real} <: LazySet{N}\n\nType that represents the empty set, i.e., the set with no elements.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.∅",
    "page": "Common Set Representations",
    "title": "LazySets.∅",
    "category": "constant",
    "text": "∅\n\nAn EmptySet instance of type Float64.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{EmptySet}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(∅::EmptySet)\n\nReturn the dimension of the empty set, which is -1 by convention.\n\nInput\n\n∅ – an empty set\n\nOutput\n\n-1 by convention.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},EmptySet{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, ∅::EmptySet{N}) where {N<:Real}\n\nReturn the support vector of an empty set.\n\nInput\n\n∅ – an empty set\n\nOutput\n\nAn error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},EmptySet{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector, ∅::EmptySet)::Bool\n\nCheck whether a given point is contained in an empty set.\n\nInput\n\nx – point/vector\n∅ – empty set\n\nOutput\n\nThe output is always false.\n\nExamples\n\njulia> ∈([1.0, 0.0], ∅)\nfalse\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{EmptySet}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(∅::EmptySet)\n\nReturn some element of an empty set.\n\nInput\n\n∅ – empty set\n\nOutput\n\nAn error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{EmptySet}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{EmptySet}; [N]::Type{<:Real}=Float64, [dim]::Int=0,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::EmptySet{N}\n\nCreate an empty set (note that there is nothing to randomize).\n\nInput\n\nEmptySet – type for dispatch\nN        – (optional, default: Float64) numeric type\ndim      – (optional, default: 0) dimension (is ignored)\nrng      – (optional, default: GLOBAL_RNG) random number generator\nseed     – (optional, default: nothing) seed for reseeding\n\nOutput\n\nThe (only) empty set of the given numeric type.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.isempty-Tuple{EmptySet}",
    "page": "Common Set Representations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(∅::EmptySet)::Bool\n\nReturn if the empty set is empty or not.\n\nInput\n\n∅ – empty set\n\nOutput\n\ntrue.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LinearAlgebra.norm-Tuple{EmptySet,Real}",
    "page": "Common Set Representations",
    "title": "LinearAlgebra.norm",
    "category": "method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\n\n\nnorm(S::EmptySet, [p]::Real=Inf)\n\nReturn the norm of an empty set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – empty set\np – (optional, default: Inf) norm\n\nOutput\n\nAn error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius-Tuple{EmptySet,Real}",
    "page": "Common Set Representations",
    "title": "LazySets.radius",
    "category": "method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\n\n\nradius(S::EmptySet, [p]::Real=Inf)\n\nReturn the radius of an empty set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – empty set\np – (optional, default: Inf) norm\n\nOutput\n\nAn error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.diameter-Tuple{EmptySet,Real}",
    "page": "Common Set Representations",
    "title": "LazySets.diameter",
    "category": "method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\n\n\ndiameter(S::EmptySet, [p]::Real=Inf)\n\nReturn the diameter of an empty set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – empty set\np – (optional, default: Inf) norm\n\nOutput\n\nAn error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Empty-set-1",
    "page": "Common Set Representations",
    "title": "Empty set",
    "category": "section",
    "text": "EmptySet\n∅\ndim(::EmptySet)\nσ(::AbstractVector{Real}, ::EmptySet{Real})\n∈(::AbstractVector{Real}, ::EmptySet{Real})\nan_element(::EmptySet)\nrand(::Type{EmptySet})\nisempty(::EmptySet)\nnorm(::EmptySet, ::Real)\nradius(::EmptySet, ::Real)\ndiameter(::EmptySet, ::Real)Inherited from LazySet:norm\nradius\ndiameter"
},

{
    "location": "lib/representations.html#LazySets.HalfSpace",
    "page": "Common Set Representations",
    "title": "LazySets.HalfSpace",
    "category": "type",
    "text": "HalfSpace{N<:Real} <: LazySet{N}\n\nType that represents a (closed) half-space of the form ax  b.\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe set y  0 in the plane:\n\njulia> HalfSpace([0, -1.], 0.)\nHalfSpace{Float64}([0.0, -1.0], 0.0)\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.LinearConstraint",
    "page": "Common Set Representations",
    "title": "LazySets.LinearConstraint",
    "category": "type",
    "text": "LinearConstraint\n\nAlias for HalfSpace\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.HalfSpace}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(hs::HalfSpace)::Int\n\nReturn the dimension of a half-space.\n\nInput\n\nhs – half-space\n\nOutput\n\nThe ambient dimension of the half-space.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},LazySets.HalfSpace{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, hs::HalfSpace{N}) where {N<:Real}\n\nReturn the support vector of a half-space.\n\nInput\n\nd  – direction\nhs – half-space\n\nOutput\n\nThe support vector in the given direction, which is only defined in the following two cases:\n\nThe direction has norm zero.\nThe direction is the half-space\'s normal direction.\n\nIn both cases the result is any point on the boundary (the defining hyperplane). Otherwise this function throws an error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},LazySets.HalfSpace{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, hs::HalfSpace{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a half-space.\n\nInput\n\nx – point/vector\nhs – half-space\n\nOutput\n\ntrue iff x  hs.\n\nAlgorithm\n\nWe just check if x satisfies ax  b.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Union{Tuple{HalfSpace{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(hs::HalfSpace{N})::Vector{N} where {N<:Real}\n\nReturn some element of a half-space.\n\nInput\n\nhs – half-space\n\nOutput\n\nAn element on the defining hyperplane.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{LazySets.HalfSpace}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{HalfSpace}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::HalfSpace{N}\n\nCreate a random half-space.\n\nInput\n\nHalfSpace – type for dispatch\nN         – (optional, default: Float64) numeric type\ndim       – (optional, default: 2) dimension\nrng       – (optional, default: GLOBAL_RNG) random number generator\nseed      – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random half-space.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the constraint a is nonzero.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.isempty-Tuple{LazySets.HalfSpace}",
    "page": "Common Set Representations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(hs::HalfSpace)::Bool\n\nReturn if a half-space is empty or not.\n\nInput\n\nhs – half-space\n\nOutput\n\nfalse.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Union{Tuple{HalfSpace{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(hs::HalfSpace{N})::Vector{LinearConstraint{N}}\n    where {N<:Real}\n\nReturn the list of constraints of a half-space.\n\nInput\n\nhs – half-space\n\nOutput\n\nA singleton list containing the half-space.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constrained_dimensions-Union{Tuple{HalfSpace{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.constrained_dimensions",
    "category": "method",
    "text": "constrained_dimensions(hs::HalfSpace{N})::Vector{Int} where N<:Real\n\nReturn the indices in which a half-space is constrained.\n\nInput\n\nhs – half-space\n\nOutput\n\nA vector of ascending indices i such that the half-space is constrained in dimension i.\n\nNotes\n\nA 2D half-space with constraint x1  0 is constrained in dimension 1 only.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.halfspace_left-Tuple{AbstractArray{Real,1},AbstractArray{Real,1}}",
    "page": "Common Set Representations",
    "title": "LazySets.halfspace_left",
    "category": "method",
    "text": "halfspace_left(p::AbstractVector{N},\n               q::AbstractVector{N})::HalfSpace{N} where {N<:Real}\n\nReturn a half-space describing the \'left\' of a two-dimensional line segment through two points.\n\nInput\n\np – first point\nq – second point\n\nOutput\n\nThe half-space whose boundary goes through the two points p and q and which describes the left-hand side of the directed line segment pq.\n\nAlgorithm\n\nThe implementation is simple: the half-space ax  b is calculated as a = [dy, -dx], where d = (dx dy) denotes the line segment pq, that is, vecd = vecp - vecq, and b = dot(p, a).\n\nExamples\n\nThe left half-space of the \"east\" and \"west\" directions in two-dimensions are the upper and lower half-spaces:\n\njulia> import LazySets.halfspace_left\n\njulia> halfspace_left([0.0, 0.0], [1.0, 0.0])\nHalfSpace{Float64}([0.0, -1.0], 0.0)\n\njulia> halfspace_left([0.0, 0.0], [-1.0, 0.0])\nHalfSpace{Float64}([0.0, 1.0], 0.0)\n\nWe create a box from the sequence of line segments that describe its edges:\n\njulia> H1 = halfspace_left([-1.0, -1.0], [1.0, -1.0]);\n\njulia> H2 = halfspace_left([1.0, -1.0], [1.0, 1.0]);\n\njulia> H3 = halfspace_left([1.0, 1.0], [-1.0, 1.0]);\n\njulia> H4 = halfspace_left([-1.0, 1.0], [-1.0, -1.0]);\n\njulia> H = HPolygon([H1, H2, H3, H4]);\n\njulia> B = BallInf([0.0, 0.0], 1.0);\n\njulia> B ⊆ H && H ⊆ B\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.halfspace_right-Tuple{AbstractArray{Real,1},AbstractArray{Real,1}}",
    "page": "Common Set Representations",
    "title": "LazySets.halfspace_right",
    "category": "method",
    "text": "halfspace_right(p::AbstractVector{N},\n                q::AbstractVector{N})::HalfSpace{N} where {N<:Real}\n\nReturn a half-space describing the \'right\' of a two-dimensional line segment through two points.\n\nInput\n\np – first point\nq – second point\n\nOutput\n\nThe half-space whose boundary goes through the two points p and q and which describes the right-hand side of the directed line segment pq.\n\nAlgorithm\n\nSee the documentation of halfspace_left. \n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Half-Space-1",
    "page": "Common Set Representations",
    "title": "Half-Space",
    "category": "section",
    "text": "HalfSpace\nLinearConstraint\ndim(::HalfSpace)\nσ(::AbstractVector{Real}, ::HalfSpace{Real})\n∈(::AbstractVector{Real}, ::HalfSpace{Real})\nan_element(::HalfSpace{N}) where {N<:Real}\nrand(::Type{HalfSpace})\nisempty(::HalfSpace)\nconstraints_list(::HalfSpace{N}) where {N<:Real}\nconstrained_dimensions(::HalfSpace{N}) where {N<:Real}\nLazySets.halfspace_left(::AbstractVector{Real}, ::AbstractVector{Real})\nLazySets.halfspace_right(::AbstractVector{Real}, ::AbstractVector{Real})Inherited from LazySet:norm\nradius\ndiameter"
},

{
    "location": "lib/representations.html#LazySets.Hyperplane",
    "page": "Common Set Representations",
    "title": "LazySets.Hyperplane",
    "category": "type",
    "text": "Hyperplane{N<:Real} <: LazySet{N}\n\nType that represents a hyperplane of the form ax = b.\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe plane y = 0:\n\njulia> Hyperplane([0, 1.], 0.)\nHyperplane{Float64}([0.0, 1.0], 0.0)\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{Hyperplane}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(hp::Hyperplane)::Int\n\nReturn the dimension of a hyperplane.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nThe ambient dimension of the hyperplane.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},Hyperplane{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, hp::Hyperplane{N}) where {N<:Real}\n\nReturn the support vector of a hyperplane.\n\nInput\n\nd  – direction\nhp – hyperplane\n\nOutput\n\nThe support vector in the given direction, which is only defined in the following two cases:\n\nThe direction has norm zero.\nThe direction is the hyperplane\'s normal direction.\n\nIn both cases the result is any point on the hyperplane. Otherwise this function throws an error.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},Hyperplane{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, hp::Hyperplane{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperplane.\n\nInput\n\nx – point/vector\nhp – hyperplane\n\nOutput\n\ntrue iff x  hp.\n\nAlgorithm\n\nWe just check if x satisfies ax = b.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Union{Tuple{Hyperplane{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(hp::Hyperplane{N})::Vector{N} where {N<:Real}\n\nReturn some element of a hyperplane.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nAn element on the hyperplane.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Hyperplane}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Hyperplane}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Hyperplane{N}\n\nCreate a random hyperplane.\n\nInput\n\nHyperplane – type for dispatch\nN          – (optional, default: Float64) numeric type\ndim        – (optional, default: 2) dimension\nrng        – (optional, default: GLOBAL_RNG) random number generator\nseed       – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random hyperplane.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the constraint a is nonzero.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.isempty-Tuple{Hyperplane}",
    "page": "Common Set Representations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(hp::Hyperplane)::Bool\n\nReturn if a hyperplane is empty or not.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nfalse.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constrained_dimensions-Union{Tuple{Hyperplane{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.constrained_dimensions",
    "category": "method",
    "text": "constrained_dimensions(hp::Hyperplane{N})::Vector{Int} where N<:Real\n\nReturn the indices in which a hyperplane is constrained.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nA vector of ascending indices i such that the hyperplane is constrained in dimension i.\n\nNotes\n\nA 2D hyperplane with constraint x1 = 0 is constrained in dimension 1 only.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Hyperplane-1",
    "page": "Common Set Representations",
    "title": "Hyperplane",
    "category": "section",
    "text": "Hyperplane\ndim(::Hyperplane)\nσ(::AbstractVector{Real}, ::Hyperplane{Real})\n∈(::AbstractVector{Real}, ::Hyperplane{Real})\nan_element(::Hyperplane{N}) where {N<:Real}\nrand(::Type{Hyperplane})\nisempty(::Hyperplane)\nconstrained_dimensions(::Hyperplane{N}) where {N<:Real}Inherited from LazySet:norm\nradius\ndiameter"
},

{
    "location": "lib/representations.html#LazySets.Hyperrectangle",
    "page": "Common Set Representations",
    "title": "LazySets.Hyperrectangle",
    "category": "type",
    "text": "Hyperrectangle{N<:Real} <: AbstractHyperrectangle{N}\n\nType that represents a hyperrectangle.\n\nA hyperrectangle is the Cartesian product of one-dimensional intervals.\n\nFields\n\ncenter – center of the hyperrectangle as a real vector\nradius – radius of the ball as a real vector, i.e., half of its width along             each coordinate direction\n\nExamples\n\nThere is also a constructor from lower and upper bounds with keyword arguments high and low. The following two constructions are equivalent:\n\njulia> c = ones(2);\n\njulia> r = [0.1, 0.2];\n\njulia> l = [0.9, 0.8];\n\njulia> h = [1.1, 1.2];\n\njulia> Hyperrectangle(c, r)\nHyperrectangle{Float64}([1.0, 1.0], [0.1, 0.2])\njulia> Hyperrectangle(low=l, high=h)\nHyperrectangle{Float64}([1.0, 1.0], [0.1, 0.2])\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Hyperrectangle}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Hyperrectangle}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Hyperrectangle{N}\n\nCreate a random hyperrectangle.\n\nInput\n\nHyperrectangle – type for dispatch\nN              – (optional, default: Float64) numeric type\ndim            – (optional, default: 2) dimension\nrng            – (optional, default: GLOBAL_RNG) random number generator\nseed           – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random hyperrectangle.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the radius is nonnegative.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Hyperrectangle}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the center of a hyperrectangle.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe center of the hyperrectangle.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{Hyperrectangle}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a hyperrectangle in every dimension.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe box radius of the hyperrectangle.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{Hyperrectangle,Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(H::Hyperrectangle{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a hyperrectangle in a given dimension.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe radius in the given dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Hyperrectangle-1",
    "page": "Common Set Representations",
    "title": "Hyperrectangle",
    "category": "section",
    "text": "Hyperrectangle\nrand(::Type{Hyperrectangle})\ncenter(::Hyperrectangle)\nradius_hyperrectangle(::Hyperrectangle)\nradius_hyperrectangle(::Hyperrectangle, ::Int)Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_list\nlinear_mapInherited from AbstractCentrallySymmetricPolytope:dim\nisempty\nan_elementInherited from AbstractHyperrectangle:σ\n∈\nnorm\nradius\nvertices_list\nhigh\nlow"
},

{
    "location": "lib/representations.html#LazySets.Interval",
    "page": "Common Set Representations",
    "title": "LazySets.Interval",
    "category": "type",
    "text": "Interval{N<:Real, IN <: AbstractInterval{N}} <: AbstractHyperrectangle{N}\n\nType representing an interval on the real line. Mathematically, it is of the form\n\na b =  a  x  b   mathbbR\n\nFields\n\ndat – data container for the given interval\n\nNotes\n\nThis type relies on the IntervalArithmetic.jl library for representation of intervals and arithmetic operations.\n\nExamples\n\nUnidimensional intervals are symbolic representations of a real closed interval.\n\nWe can create intervals in different ways, the simpler way is to pass a pair of numbers:\n\njulia> x = Interval(0.0, 1.0)\nInterval{Float64,IntervalArithmetic.Interval{Float64}}([0, 1])\n\nor a 2-vector:\n\njulia> x = Interval([0.0, 1.0])\nInterval{Float64,IntervalArithmetic.Interval{Float64}}([0, 1])\n\nNote that if the package IntervalArithmetic is loaded in the current scope, you have to prepend the LazySets to the interval type, since there is a name conflict otherwise.\n\njulia> using IntervalArithmetic\nWARNING: using IntervalArithmetic.Interval in module Main conflicts with an existing identifier.\n\njulia> x = Interval(IntervalArithmetic.Interval(0.0, 1.0))\nInterval{Float64,IntervalArithmetic.Interval{Float64}}([0, 1])\n\njulia> dim(x)\n1\n\njulia> center(x)\n1-element Array{Float64,1}:\n 0.5\n\nThis type is such that the usual pairwise arithmetic operators +, -, * trigger the corresponding interval arithmetic backend method, and return a new Interval object. For the symbolic Minkowksi sum, use MinkowskiSum or ⊕.\n\nInterval of other numeric types can be created as well, eg. a rational interval:\n\njulia> Interval(0//1, 2//1)\nInterval{Rational{Int64},AbstractInterval{Rational{Int64}}}([0//1, 2//1])\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(x::Interval)::Int\n\nReturn the ambient dimension of an interval.\n\nInput\n\nx – interval\n\nOutput\n\nThe integer 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},LazySets.Interval{Real,IN} where IN<:IntervalArithmetic.AbstractInterval{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}) where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\n\n\nσ(d::AbstractVector{N}, x::Interval{N}) where {N<:Real}\n\nReturn the support vector of an ellipsoid in a given direction.\n\nInput\n\nd – direction\nx – interval\n\nOutput\n\nSupport vector in the given direction.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{T,1} where T,LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(v::N, x::Interval) where {N}\n\nReturn whether a number is contained in the interval.\n\nInput\n\nv – scalar\nx – interval\n\nOutput\n\ntrue iff x contains v.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{Real,LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(v::N, x::Interval) where {N}\n\nReturn whether a number is contained in the interval.\n\nInput\n\nv – scalar\nx – interval\n\nOutput\n\ntrue iff x contains v.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(S::LazySet{N}) where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\n\n\nan_element(P::AbstractCentrallySymmetricPolytope{N})::Vector{N}\n    where {N<:Real}\n\nReturn some element of a centrally symmetric polytope.\n\nInput\n\nP – centrally symmetric polytope\n\nOutput\n\nThe center of the centrally symmetric polytope.\n\n\n\n\n\nan_element(x::Interval{N})::Vector{N} where {N<:Real}\n\nReturn some element of an interval.\n\nInput\n\nx – interval\n\nOutput\n\nThe left border (low(x)) of the interval.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(x::Interval)\n\nReturn the list of vertices of this interval.\n\nInput\n\nx – interval\n\nOutput\n\nThe list of vertices of the interval represented as two one-dimensional vectors.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(x::Interval)\n\nReturn the interval\'s center.\n\nInput\n\nx – interval\n\nOutput\n\nThe center, or midpoint, of x.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.low-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.low",
    "category": "method",
    "text": "low(x::Interval)\n\nReturn the lower component of an interval.\n\nInput\n\nx – interval\n\nOutput\n\nThe lower (lo) component of the interval.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.high-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.high",
    "category": "method",
    "text": "high(x::Interval)\n\nReturn the higher or upper component of an interval.\n\nInput\n\nx – interval\n\nOutput\n\nThe higher (hi) component of the interval.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(x::Interval{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of an interval in every dimension.\n\nInput\n\nx – interval\n\nOutput\n\nThe box radius of the interval (a one-dimensional vector).\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Interval,Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "method",
    "text": "radius_hyperrectangle(x::Interval{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of an interval in a given dimension.\n\nInput\n\nx – interval\ni – dimension index (must be 1)\n\nOutput\n\nThe box radius in the given dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:+-Tuple{LazySets.Interval,LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "Base.:+",
    "category": "method",
    "text": "+(x::Interval, y::Interval)\n\nReturn the sum of the intervals.\n\nInput\n\nx – interval\ny – interval\n\nOutput\n\nThe sum of the intervals as a new Interval set.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:--Tuple{LazySets.Interval,LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "Base.:-",
    "category": "method",
    "text": "-(x::Interval, y::Interval)\n\nReturn the difference of the intervals.\n\nInput\n\nx – interval\ny – interval\n\nOutput\n\nThe difference of the intervals as a new Interval set.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:*-Tuple{LazySets.Interval,LazySets.Interval}",
    "page": "Common Set Representations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(x::Interval, y::Interval)\n\nReturn the product of the intervals.\n\nInput\n\nx – interval\ny – interval\n\nOutput\n\nThe product of the intervals as a new Interval set.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{LazySets.Interval}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Interval}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Interval{N}\n\nCreate a random interval.\n\nInput\n\nInterval – type for dispatch\nN        – (optional, default: Float64) numeric type\ndim      – (optional, default: 1) dimension\nrng      – (optional, default: GLOBAL_RNG) random number generator\nseed     – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random interval.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Interval-1",
    "page": "Common Set Representations",
    "title": "Interval",
    "category": "section",
    "text": "Interval\ndim(::Interval)\nσ(::AbstractVector{Real}, ::Interval{Real})\n∈(::AbstractVector, ::Interval)\n∈(::Real, ::Interval)\nan_element(::Interval)\nvertices_list(::Interval)\ncenter(::Interval)\nlow(::Interval)\nhigh(::Interval)\nradius_hyperrectangle(::Interval)\nradius_hyperrectangle(::Interval, ::Int)\n+(::Interval, ::Interval)\n-(::Interval, ::Interval)\n*(::Interval, ::Interval)\nrand(::Type{Interval})Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_list\nlinear_mapInherited from AbstractCentrallySymmetricPolytope:isemptyInherited from AbstractHyperrectangle:norm\nradius"
},

{
    "location": "lib/representations.html#LazySets.Line",
    "page": "Common Set Representations",
    "title": "LazySets.Line",
    "category": "type",
    "text": "Line{N<:Real} <: LazySet{N}\n\nType that represents a line in 2D of the form ax = b (i.e., a special case of a Hyperplane).\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe line y = -x + 1:\n\njulia> Line([1., 1.], 1.)\nLine{Float64,Array{Float64,1}}([1.0, 1.0], 1.0)\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Line}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(L::Line)::Int\n\nReturn the ambient dimension of a line.\n\nInput\n\nL – line\n\nOutput\n\nThe ambient dimension of the line, which is 2.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},LazySets.Line{Real,V} where V<:AbstractArray{Real,1}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, L::Line{N}) where {N<:Real}\n\nReturn the support vector of a line in a given direction.\n\nInput\n\nd – direction\nL – line\n\nOutput\n\nThe support vector in the given direction, which is defined the same way as for the more general Hyperplane.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},LazySets.Line{Real,V} where V<:AbstractArray{Real,1}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, L::Line{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a line.\n\nInput\n\nx – point/vector\nL – line\n\nOutput\n\ntrue iff x ∈ L.\n\nAlgorithm\n\nThe point x belongs to the line if and only if ax = b holds.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Union{Tuple{Line{N,V} where V<:AbstractArray{N,1}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(L::Line{N})::Vector{N} where N<:Real\n\nReturn some element of a line.\n\nInput\n\nL – line\n\nOutput\n\nAn element on the line.\n\nAlgorithm\n\nIf the b value of the line is zero, the result is the origin. Otherwise the result is some x = x1 x2 such that ax1 x2 = b. We first find out in which dimension a is nonzero, say, dimension 1, and then choose x1 = 1 and accordingly x2 = fracb - a1a2.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{LazySets.Line}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Line}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Line{N}\n\nCreate a random line.\n\nInput\n\nLine – type for dispatch\nN    – (optional, default: Float64) numeric type\ndim  – (optional, default: 2) dimension\nrng  – (optional, default: GLOBAL_RNG) random number generator\nseed – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random line.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1. Additionally, the constraint a is nonzero.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.isempty-Tuple{LazySets.Line}",
    "page": "Common Set Representations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(L::Line)::Bool\n\nReturn if a line is empty or not.\n\nInput\n\nL – line\n\nOutput\n\nfalse.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constrained_dimensions-Union{Tuple{Line{N,V} where V<:AbstractArray{N,1}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.constrained_dimensions",
    "category": "method",
    "text": "constrained_dimensions(L::Line{N})::Vector{Int} where N<:Real\n\nReturn the indices in which a line is constrained.\n\nInput\n\nL – line\n\nOutput\n\nA vector of ascending indices i such that the line is constrained in dimension i.\n\nNotes\n\nA line with constraint x1 = 0 is constrained in dimension 1 only.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Line-1",
    "page": "Common Set Representations",
    "title": "Line",
    "category": "section",
    "text": "Line\ndim(::Line)\nσ(::AbstractVector{Real}, ::Line{Real})\n∈(::AbstractVector{Real}, ::Line{Real})\nan_element(::Line{N}) where {N<:Real}\nrand(::Type{Line})\nisempty(::Line)\nconstrained_dimensions(::Line{N}) where {N<:Real}Inherited from LazySet:norm\nradius\ndiameter"
},

{
    "location": "lib/representations.html#LazySets.LineSegment",
    "page": "Common Set Representations",
    "title": "LazySets.LineSegment",
    "category": "type",
    "text": "LineSegment{N<:Real} <: AbstractCentrallySymmetricPolytope{N}\n\nType that represents a line segment in 2D between two points p and q.\n\nFields\n\np – first point\nq – second point\n\nExamples\n\nA line segment along the x = y diagonal:\n\njulia> s = LineSegment([0., 0], [1., 1.])\nLineSegment{Float64}([0.0, 0.0], [1.0, 1.0])\njulia> dim(s)\n2\n\nUse plot(s) to plot the extreme points of s and the line segment joining them. Membership test is computed with ∈ (in):\n\njulia> [0., 0] ∈ s && [.25, .25] ∈ s && [1., 1] ∈ s && !([.5, .25] ∈ s)\ntrue\n\nWe can check the intersection with another line segment, and optionally compute a witness (which is just the common point in this case):\n\njulia> sn = LineSegment([1., 0], [0., 1.])\nLineSegment{Float64}([1.0, 0.0], [0.0, 1.0])\njulia> isempty(s ∩ sn)\nfalse\njulia> is_intersection_empty(s, sn, true)\n(false, [0.5, 0.5])\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LineSegment}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(L::LineSegment)::Int\n\nReturn the ambient dimension of a line segment.\n\nInput\n\nL – line segment\n\nOutput\n\nThe ambient dimension of the line segment, which is 2.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},LineSegment{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, L::LineSegment{N}) where {N<:Real}\n\nReturn the support vector of a line segment in a given direction.\n\nInput\n\nd – direction\nL – line segment\n\nOutput\n\nThe support vector in the given direction.\n\nAlgorithm\n\nIf the angle between the vector q - p and d is bigger than 90° and less than 270° (measured in counter-clockwise order), the result is p, otherwise it is q. If the angle is exactly 90° or 270°, or if the direction has norm zero, this implementation returns q.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},LineSegment{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, L::LineSegment{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a line segment.\n\nInput\n\nx – point/vector\nL – line segment\n\nOutput\n\ntrue iff x  L.\n\nAlgorithm\n\nLet L = (p q) be the line segment with extremes p and q, and let x be the given point.\n\nA necessary condition for x  (p q) is that the three points are aligned, thus their cross product should be zero.\nIt remains to check that x belongs to the box approximation of L. This amounts to comparing each coordinate with those of the extremes p and q.\n\nNotes\n\nThe algorithm is inspired from here.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{LineSegment}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{LineSegment}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::LineSegment{N}\n\nCreate a random line segment.\n\nInput\n\nLineSegment – type for dispatch\nN           – (optional, default: Float64) numeric type\ndim         – (optional, default: 2) dimension\nrng         – (optional, default: GLOBAL_RNG) random number generator\nseed        – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random line segment.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.halfspace_left-Tuple{LineSegment}",
    "page": "Common Set Representations",
    "title": "LazySets.halfspace_left",
    "category": "method",
    "text": "halfspace_left(L::LineSegment)\n\nReturn a half-space describing the \'left\' of a two-dimensional line segment through two points.\n\nInput\n\nL – line segment\n\nOutput\n\nThe half-space whose boundary goes through the two points p and q and which describes the left-hand side of the directed line segment pq.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.halfspace_right-Tuple{LineSegment}",
    "page": "Common Set Representations",
    "title": "LazySets.halfspace_right",
    "category": "method",
    "text": "halfspace_right(L::LineSegment)\n\nReturn a half-space describing the \'right\' of a two-dimensional line segment through two points.\n\nInput\n\nL – line segment\n\nOutput\n\nThe half-space whose boundary goes through the two points p and q and which describes the right-hand side of the directed line segment pq.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Tuple{LineSegment}",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(L::LineSegment{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a line segment in 2D.\n\nInput\n\nL – line segment\n\nOutput\n\nA vector of constraints that define the line segment.\n\nAlgorithm\n\nL is defined by 4 constraints. In this algorithm, the first two constraints are returned by halfspace_right and halfspace_left, and the other two are obtained by considering the vector normal to the line segment that passes through each opposite vertex.\n\nNotes\n\nThis function returns a vector of halfspaces. It does not return equality constraints.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Line-segment-1",
    "page": "Common Set Representations",
    "title": "Line segment",
    "category": "section",
    "text": "LineSegment\ndim(::LineSegment)\nσ(::AbstractVector{Real}, ::LineSegment{Real})\n∈(::AbstractVector{Real}, ::LineSegment{Real})\nrand(::Type{LineSegment})\nLazySets.halfspace_left(::LineSegment)\nLazySets.halfspace_right(::LineSegment)\nLazySets.constraints_list(::LineSegment)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractCentrallySymmetricPolytope:isempty"
},

{
    "location": "lib/representations.html#Polygons-1",
    "page": "Common Set Representations",
    "title": "Polygons",
    "category": "section",
    "text": ""
},

{
    "location": "lib/representations.html#LazySets.HPolygon",
    "page": "Common Set Representations",
    "title": "LazySets.HPolygon",
    "category": "type",
    "text": "HPolygon{N<:Real} <: AbstractHPolygon{N}\n\nType that represents a convex polygon in constraint representation whose edges are sorted in counter-clockwise fashion with respect to their normal directions.\n\nFields\n\nconstraints – list of linear constraints, sorted by the angle\n\nNotes\n\nThe default constructor assumes that the given list of edges is sorted. It does not perform any sorting. Use addconstraint! to iteratively add the edges in a sorted way.\n\nHPolygon(constraints::Vector{LinearConstraint{<:Real}}) – default constructor\nHPolygon() – constructor with no constraints\nHPolygon(S::LazySet) – constructor from another set\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},HPolygon{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, P::HPolygon{N};\n  [linear_search]::Bool=(length(P.constraints) < BINARY_SEARCH_THRESHOLD)\n ) where {N<:Real}\n\nReturn the support vector of a polygon in a given direction.\n\nInput\n\nd             – direction\nP             – polygon in constraint representation\nlinear_search – (optional, default: see below) flag for controlling whether                    to perform a linear search or a binary search\n\nOutput\n\nThe support vector in the given direction. The result is always one of the vertices; in particular, if the direction has norm zero, any vertex is returned.\n\nAlgorithm\n\nComparison of directions is performed using polar angles; see the overload of <= for two-dimensional vectors.\n\nFor polygons with BINARY_SEARCH_THRESHOLD = 10 or more constraints we use a binary search by default.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Constraint-representation-1",
    "page": "Common Set Representations",
    "title": "Constraint representation",
    "category": "section",
    "text": "HPolygon\nσ(::AbstractVector{Real}, ::HPolygon{Real})Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:isempty\nsingleton_list\nlinear_mapInherited from AbstractPolygon:dimInherited from AbstractHPolygon:an_element\n∈\nvertices_list\ntohrep\ntovrep\naddconstraint!\nconstraints_list"
},

{
    "location": "lib/representations.html#LazySets.HPolygonOpt",
    "page": "Common Set Representations",
    "title": "LazySets.HPolygonOpt",
    "category": "type",
    "text": "HPolygonOpt{N<:Real} <: AbstractHPolygon{N}\n\nType that represents a convex polygon in constraint representation whose edges are sorted in counter-clockwise fashion with respect to their normal directions. This is a refined version of HPolygon.\n\nFields\n\nconstraints – list of linear constraints\nind – index in the list of constraints to begin the search to evaluate the          support function\n\nNotes\n\nThis structure is optimized to evaluate the support function/vector with a large sequence of directions that are close to each other. The strategy is to have an index that can be used to warm-start the search for optimal values in the support vector computation.\n\nThe default constructor assumes that the given list of edges is sorted. It does not perform any sorting. Use addconstraint! to iteratively add the edges in a sorted way.\n\nHPolygonOpt(constraints::Vector{LinearConstraint{<:Real}}, [ind]::Int) – default constructor with optional index\nHPolygonOpt(S::LazySet) – constructor from another set\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},HPolygonOpt{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, P::HPolygonOpt{N};\n  [linear_search]::Bool=(length(P.constraints) < BINARY_SEARCH_THRESHOLD)\n ) where {N<:Real}\n\nReturn the support vector of an optimized polygon in a given direction.\n\nInput\n\nd             – direction\nP             – optimized polygon in constraint representation\nlinear_search – (optional, default: see below) flag for controlling whether                    to perform a linear search or a binary search\n\nOutput\n\nThe support vector in the given direction. The result is always one of the vertices; in particular, if the direction has norm zero, any vertex is returned.\n\nAlgorithm\n\nComparison of directions is performed using polar angles; see the overload of <= for two-dimensional vectors.\n\nFor polygons with BINARY_SEARCH_THRESHOLD = 10 or more constraints we use a binary search by default.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Optimized-constraint-representation-1",
    "page": "Common Set Representations",
    "title": "Optimized constraint representation",
    "category": "section",
    "text": "HPolygonOpt\nσ(::AbstractVector{Real}, ::HPolygonOpt{Real})Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:isempty\nsingleton_list\nlinear_mapInherited from AbstractPolygon:dimInherited from AbstractHPolygon:an_element\n∈\nvertices_list\ntohrep\ntovrep\naddconstraint!\nconstraints_list"
},

{
    "location": "lib/representations.html#LazySets.VPolygon",
    "page": "Common Set Representations",
    "title": "LazySets.VPolygon",
    "category": "type",
    "text": "VPolygon{N<:Real} <: AbstractPolygon{N}\n\nType that represents a polygon by its vertices.\n\nFields\n\nvertices – the list of vertices\n\nNotes\n\nThe constructor of VPolygon runs a convex hull algorithm, and the given vertices are sorted in counter-clockwise fashion. The constructor flag apply_convex_hull can be used to skip the computation of the convex hull.\n\nVPolygon(vertices::Vector{Vector{N}};           apply_convex_hull::Bool=true,           algorithm::String=\"monotone_chain\")\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},VPolygon{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, P::VPolygon{N}) where {N<:Real}\n\nReturn the support vector of a polygon in a given direction.\n\nInput\n\nd – direction\nP – polygon in vertex representation\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the first vertex is returned.\n\nAlgorithm\n\nThis implementation performs a brute-force search, comparing the projection of each vector along the given direction. It runs in O(n) where n is the number of vertices.\n\nNotes\n\nFor arbitrary points without structure this is the best one can do. However, a more efficient approach can be used if the vertices of the polygon have been sorted in counter-clockwise fashion. In that case a binary search algorithm can be used that runs in O(log n). See issue #40.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},VPolygon{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, P::VPolygon{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a polygon in vertex representation.\n\nInput\n\nx – point/vector\nP – polygon in vertex representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation exploits that the polygon\'s vertices are sorted in counter-clockwise fashion. Under this assumption we can just check if the vertex lies on the left of each edge, using the dot product.\n\nExamples\n\njulia> P = VPolygon([[2.0, 3.0], [3.0, 1.0], [5.0, 1.0], [4.0, 5.0]];\n                    apply_convex_hull=false);\n\njulia> ∈([4.5, 3.1], P)\nfalse\njulia> ∈([4.5, 3.0], P)\ntrue\njulia> ∈([4.4, 3.4], P)  #  point lies on the edge -> floating point error\nfalse\njulia> P = VPolygon([[2//1, 3//1], [3//1, 1//1], [5//1, 1//1], [4//1, 5//1]];\n                     apply_convex_hull=false);\n\njulia> ∈([44//10, 34//10], P)  #  with rational numbers the answer is correct\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Union{Tuple{VPolygon{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(P::VPolygon{N})::Vector{N} where {N<:Real}\n\nReturn some element of a polygon in vertex representation.\n\nInput\n\nP – polygon in vertex representation\n\nOutput\n\nThe first vertex of the polygon in vertex representation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{VPolygon}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{VPolygon}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::VPolygon{N}\n\nCreate a random polygon in vertex representation.\n\nInput\n\nVPolygon     – type for dispatch\nN            – (optional, default: Float64) numeric type\ndim          – (optional, default: 2) dimension\nrng          – (optional, default: GLOBAL_RNG) random number generator\nseed         – (optional, default: nothing) seed for reseeding\nnum_vertices – (optional, default: -1) number of vertices of the                   polygon (see comment below)\n\nOutput\n\nA random polygon in vertex representation.\n\nAlgorithm\n\nWe follow the idea here based on P. Valtr. Probability that n random points are in convex position. There is also a nice video available here.\n\nThe number of vertices can be controlled with the argument num_vertices. For a negative value we choose a random number in the range 3:10.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{VPolygon}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(P::VPolygon{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a convex polygon in vertex representation.\n\nInput\n\nP – a polygon vertex representation\n\nOutput\n\nList of vertices.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tohrep-Tuple{VPolygon}",
    "page": "Common Set Representations",
    "title": "LazySets.tohrep",
    "category": "method",
    "text": "tohrep(P::HPoly{N}) where {N}\n\nReturn a constraint representation of the given polyhedron in constraint representation (no-op).\n\nInput\n\nP – polyhedron in constraint representation\n\nOutput\n\nThe same polyhedron instance.\n\n\n\n\n\ntohrep(P::VPolygon{N}, ::Type{HPOLYGON}=HPolygon\n      )::AbstractHPolygon{N} where {N<:Real, HPOLYGON<:AbstractHPolygon}\n\nBuild a constraint representation of the given polygon.\n\nInput\n\nP        – polygon in vertex representation\nHPOLYGON – (optional, default: HPolygon) type of target polygon\n\nOutput\n\nThe same polygon but in constraint representation, an AbstractHPolygon.\n\nAlgorithm\n\nThe algorithms consists of adding an edge for each consecutive pair of vertices. Since the vertices are already ordered in counter-clockwise fashion (CWW), the constraints will be sorted automatically (CCW) if we start with the first edge between the first and second vertex.\n\n\n\n\n\ntohrep(P::VPolytope{N}; [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polytope in V-representation to a polytope in H-representation.\n\nInput\n\nP          – polytope in vertex representation\nbackend    – (optional, default: default_polyhedra_backend(P, N)) the polyhedral                 computations backend,                 see Polyhedra\'s documentation                 for further information\n\nOutput\n\nThe HPolytope which is the constraint representation of the given polytope in vertex representation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tovrep-Tuple{VPolygon}",
    "page": "Common Set Representations",
    "title": "LazySets.tovrep",
    "category": "method",
    "text": "tovrep(P::HPoly{N};\n      [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polyhedron in H-representation to a polytope in V-representation.\n\nInput\n\nP          – polyhedron in constraint representation\nbackend    – (optional, default: default_polyhedra_backend(P, N))                 the polyhedral computations backend\n\nOutput\n\nThe VPolytope which is the vertex representation of the given polyhedron in constraint representation.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\ntovrep(P::VPolygon{N})::VPolygon{N} where {N<:Real}\n\nBuild a vertex representation of the given polygon.\n\nInput\n\nP – polygon in vertex representation\n\nOutput\n\nThe identity, i.e., the same polygon instance.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Tuple{VPolygon}",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(P::VPolygon{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a polygon in V-representation.\n\nInput\n\nP – polygon in V-representation\n\nOutput\n\nThe list of constraints of the polygon.\n\nAlgorithm\n\nFirst the H-representation of P is computed, then its list of constraints is returned. \n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Vertex-representation-1",
    "page": "Common Set Representations",
    "title": "Vertex representation",
    "category": "section",
    "text": "VPolygon\nσ(::AbstractVector{Real}, ::VPolygon{Real})\n∈(::AbstractVector{Real}, ::VPolygon{Real})\nan_element(::VPolygon{N}) where {N<:Real}\nrand(::Type{VPolygon})\nvertices_list(::VPolygon)\ntohrep(::VPolygon)\ntovrep(::VPolygon)\nconstraints_list(::VPolygon)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:isempty\nsingleton_list\nlinear_mapInherited from AbstractPolygon:dim"
},

{
    "location": "lib/representations.html#LazySets.jump2pi",
    "page": "Common Set Representations",
    "title": "LazySets.jump2pi",
    "category": "function",
    "text": "jump2pi(x::N)::N where {N<:AbstractFloat}\n\nReturn x + 2π if x is negative, otherwise return x.\n\nInput\n\nx – real scalar\n\nOutput\n\nx + 2π if x is negative, x otherwise.\n\nExamples\n\njulia> import LazySets.jump2pi\n\njulia> jump2pi(0.0)\n0.0\n\njulia> jump2pi(-0.5)\n5.783185307179586\n\njulia> jump2pi(0.5)\n0.5\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:<=-Tuple{AbstractArray{AbstractFloat,1},AbstractArray{AbstractFloat,1}}",
    "page": "Common Set Representations",
    "title": "Base.:<=",
    "category": "method",
    "text": "<=(u::AbstractVector{N}, v::AbstractVector{N})::Bool where {N<:Real}\n\nCompares two 2D vectors by their direction.\n\nInput\n\nu –  first 2D direction\nv –  second 2D direction\n\nOutput\n\nTrue iff arg(u) 2π  arg(v) 2π\n\nNotes\n\nThe argument is measured in counter-clockwise fashion, with the 0 being the direction (1, 0).\n\nAlgorithm\n\nThe implementation checks the quadrant of each direction, and compares directions using the right-hand rule. In particular, it doesn\'t use the arctangent.\n\n\n\n\n\n<=(u::AbstractVector{N}, v::AbstractVector{N})::Bool where {N<:AbstractFloat}\n\nCompares two 2D vectors by their direction.\n\nInput\n\nu –  first 2D direction\nv –  second 2D direction\n\nOutput\n\nTrue iff arg(u) 2π  arg(v) 2π\n\nNotes\n\nThe argument is measured in counter-clockwise fashion, with the 0 being the direction (1, 0).\n\nAlgorithm\n\nThe implementation uses the arctangent function with sign, atan, which for two arguments implements the atan2 function.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.quadrant-Tuple{AbstractArray{Real,1}}",
    "page": "Common Set Representations",
    "title": "LazySets.quadrant",
    "category": "method",
    "text": "quadrant(w::AbstractVector{N})::Int where {N<:Real}\n\nCompute the quadrant where the direction w belongs.\n\nInput\n\nw –  direction\n\nOutput\n\nAn integer from 0 to 3, with the following convention:\n\n     ^\n   1 | 0\n  ---+-->\n   2 | 3\n\nAlgorithm\n\nThe idea is to encode the following logic function: 11  0 01  1 00  2 10  3, according to the convention of above.\n\nThis function is inspired from AGPX\'s answer in: Sort points in clockwise order?\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Sorting-directions-1",
    "page": "Common Set Representations",
    "title": "Sorting directions",
    "category": "section",
    "text": "LazySets.jump2pi\n<=(::AbstractVector{AbstractFloat}, ::AbstractVector{AbstractFloat})\nLazySets.quadrant(::AbstractVector{Real})"
},

{
    "location": "lib/representations.html#Polyhedra-and-Polytopes-1",
    "page": "Common Set Representations",
    "title": "Polyhedra and Polytopes",
    "category": "section",
    "text": ""
},

{
    "location": "lib/representations.html#LazySets.HPolytope",
    "page": "Common Set Representations",
    "title": "LazySets.HPolytope",
    "category": "type",
    "text": "HPolytope{N<:Real} <: AbstractPolytope{N}\n\nType that represents a convex polytope in H-representation.\n\nFields\n\nconstraints – vector of linear constraints\n\nNote\n\nRecall that a polytope is a bounded polyhedron. Boundedness is a running assumption in this type.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.HPolyhedron",
    "page": "Common Set Representations",
    "title": "LazySets.HPolyhedron",
    "category": "type",
    "text": "HPolyhedron{N<:Real} <: LazySet{N}\n\nType that represents a convex polyhedron in H-representation.\n\nFields\n\nconstraints – vector of linear constraints\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(P::HPoly{N})::Int where {N<:Real}\n\nReturn the dimension of a polyhedron in H-representation.\n\nInput\n\nP  – polyhedron in H-representation\n\nOutput\n\nThe ambient dimension of the polyhedron in H-representation. If it has no constraints, the result is -1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.ρ-Tuple{AbstractArray{Real,1},Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.ρ",
    "category": "method",
    "text": "ρ(d::AbstractVector{N}, S::LazySet{N})::N where {N<:Real}\n\nEvaluate the support function of a set in a given direction.\n\nInput\n\nd – direction\nS – convex set\n\nOutput\n\nThe support function of the set S for the direction d.\n\nNotes\n\nThe numeric type of the direction and the set must be identical.\n\n\n\n\n\nρ(d::AbstractVector{N}, P::HPoly{N})::N where {N<:Real}\n\nEvaluate the support function of a polyhedron (in H-representation) in a given direction.\n\nInput\n\nd – direction\nP – polyhedron in H-representation\n\nOutput\n\nThe support function of the polyhedron. If a polytope is unbounded in the given direction, we throw an error. If a polyhedron is unbounded in the given direction, the result is Inf.\n\nAlgorithm\n\nThis implementation uses GLPKSolverLP as linear programming backend.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, P::HPoly{N}) where {N<:Real}\n\nReturn the support vector of a polyhedron (in H-representation) in a given direction.\n\nInput\n\nd – direction\nP – polyhedron in H-representation\n\nOutput\n\nThe support vector in the given direction.\n\nAlgorithm\n\nThis implementation uses GLPKSolverLP as linear programming backend.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, P::HPoly{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a polyhedron in constraint representation.\n\nInput\n\nx – vector with the coordinates of the point\nP – polyhedron in constraint representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation checks if the point lies on the outside of each hyperplane. This is equivalent to checking if the point lies in each half-space.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.addconstraint!-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}},LazySets.HalfSpace{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.addconstraint!",
    "category": "method",
    "text": "addconstraint!(P::HPoly{N},\n               constraint::LinearConstraint{N})::Nothing where {N<:Real}\n\nAdd a linear constraint to a polyhedron in H-representation.\n\nInput\n\nP          – polyhedron in H-representation\nconstraint – linear constraint to add\n\nOutput\n\nNothing.\n\nNotes\n\nIt is left to the user to guarantee that the dimension of all linear constraints is the same.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(P::HPoly{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a polyhedron in H-representation.\n\nInput\n\nP – polyhedron in H-representation\n\nOutput\n\nThe list of constraints of the polyhedron.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.copy-Union{Tuple{PT}, Tuple{PT}, Tuple{N}} where PT<:Union{HPolyhedron{N}, HPolytope{N}} where N",
    "page": "Common Set Representations",
    "title": "Base.copy",
    "category": "method",
    "text": "copy(P::PT) where {N, PT<:HPoly{N}}\n\nCreate a copy of a polyhedron.\n\nInput\n\nP – polyhedron\n\nOutput\n\nThe polyhedron obtained by copying the constraints in P using Base.copy.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tosimplehrep-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.tosimplehrep",
    "category": "method",
    "text": "tosimplehrep(P::HPoly{N}) where {N}\n\nReturn the simple H-representation Ax  b of a polyhedron.\n\nInput\n\nP – polyhedron\n\nOutput\n\nThe tuple (A, b) where A is the matrix of normal directions and b are the offsets.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tohrep-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.tohrep",
    "category": "method",
    "text": "tohrep(P::HPoly{N}) where {N}\n\nReturn a constraint representation of the given polyhedron in constraint representation (no-op).\n\nInput\n\nP – polyhedron in constraint representation\n\nOutput\n\nThe same polyhedron instance.\n\n\n\n\n\ntohrep(P::VPolytope{N}; [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polytope in V-representation to a polytope in H-representation.\n\nInput\n\nP          – polytope in vertex representation\nbackend    – (optional, default: default_polyhedra_backend(P, N)) the polyhedral                 computations backend,                 see Polyhedra\'s documentation                 for further information\n\nOutput\n\nThe HPolytope which is the constraint representation of the given polytope in vertex representation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.isempty-Union{Tuple{Union{HPolyhedron{N}, HPolytope{N}}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(P::HPoly{N}; [solver]=GLPKSolverLP())::Bool where {N<:Real}\n\nDetermine whether a polyhedron is empty.\n\nInput\n\nP       – polyhedron\nbackend – (optional, default: default_polyhedra_backend(P, N))              the polyhedral computations backend\nsolver  – (optional, default: GLPKSolverLP()) LP solver backend\n\nOutput\n\ntrue if and only if the constraints are inconsistent.\n\nAlgorithm\n\nThis function uses Polyhedra.isempty which evaluates the feasibility of the LP whose feasible set is determined by the set of constraints and whose objective function is zero.\n\nNotes\n\nThis implementation uses GLPKSolverLP as linear programming backend by default.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.convex_hull-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}},Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.convex_hull",
    "category": "method",
    "text": "convex_hull(P1::HPoly{N}, P2::HPoly{N};\n           [backend]=default_polyhedra_backend(P1, N)) where {N}\n\nCompute the convex hull of the set union of two polyhedra in H-representation.\n\nInput\n\nP1         – polyhedron\nP2         – another polyhedron\nbackend    – (optional, default: default_polyhedra_backend(P1, N))                 the polyhedral computations backend\n\nOutput\n\nThe HPolyhedron (resp. HPolytope) obtained by the concrete convex hull of P1 and P2.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.cartesian_product-Union{Tuple{N}, Tuple{Union{HPolyhedron{N}, HPolytope{N}},Union{HPolyhedron{N}, HPolytope{N}}}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.cartesian_product",
    "category": "method",
    "text": "cartesian_product(P1::HPoly{N}, P2::HPoly{N};\n                  [backend]=default_polyhedra_backend(P1, N)) where N<:Real\n\nCompute the Cartesian product of two polyhedra in H-representaion.\n\nInput\n\nP1         – polyhedron\nP2         – another polyhedron\nbackend    – (optional, default: default_polyhedra_backend(P1, N))                 the polyhedral computations backend\n\nOutput\n\nThe polyhedron obtained by the concrete cartesian product of P1 and P2.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tovrep-Tuple{Union{HPolyhedron{Real}, HPolytope{Real}}}",
    "page": "Common Set Representations",
    "title": "LazySets.tovrep",
    "category": "method",
    "text": "tovrep(P::HPoly{N};\n      [backend]=default_polyhedra_backend(P, N)) where {N}\n\nTransform a polyhedron in H-representation to a polytope in V-representation.\n\nInput\n\nP          – polyhedron in constraint representation\nbackend    – (optional, default: default_polyhedra_backend(P, N))                 the polyhedral computations backend\n\nOutput\n\nThe VPolytope which is the vertex representation of the given polyhedron in constraint representation.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Polyhedra.polyhedron-Tuple{Union{HPolyhedron{N}, HPolytope{N}} where N}",
    "page": "Common Set Representations",
    "title": "Polyhedra.polyhedron",
    "category": "method",
    "text": "polyhedron(P::HPoly{N}, [backend]=default_polyhedra_backend(P, N)) where {N}\n\nReturn an HRep polyhedron from Polyhedra.jl given a polytope in H-representation.\n\nInput\n\nP       – polytope\nbackend – (optional, default: call default_polyhedra_backend(P, N))               the polyhedral computations backend\n\nOutput\n\nAn HRep polyhedron.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\npolyhedron(P::VPolytope{N}, [backend]=default_polyhedra_backend(P, N)) where {N}\n\nReturn an VRep polyhedron from Polyhedra.jl given a polytope in V-representation.\n\nInput\n\nP       – polytope\nbackend – (optional, default: default_polyhedra_backend(P, N)) the polyhedral              computations backend, see Polyhedra\'s documentation              for further information\n\nOutput\n\nA VRep polyhedron.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.remove_redundant_constraints",
    "page": "Common Set Representations",
    "title": "LazySets.remove_redundant_constraints",
    "category": "function",
    "text": "remove_redundant_constraints(P::PT;\n                             backend=GLPKSolverLP()) where {N, PT<:HPoly{N}}\n\nGiven a polyhedron in H-representation, return a new polyhedron with no reundant constraints.\n\nInput\n\nP       – polyhedron\nbackend – (optional, default: GLPKSolverLP) the numeric LP solver backend\n\nOutput\n\nA new polyhedron obtained by removing the redundant constraints in P.\n\nAlgorithm\n\nSee remove_redundant_constraints!. \n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.remove_redundant_constraints!",
    "page": "Common Set Representations",
    "title": "LazySets.remove_redundant_constraints!",
    "category": "function",
    "text": "remove_redundant_constraints!(P::PT;\n                              backend=GLPKSolverLP()) where {N, PT<:HPoly{N}}\n\nRemove the redundant constraints in a polyhedron in H-representation; the polyhedron is updated inplace.\n\nInput\n\nP       – polyhedron\nbackend – (optional, default: GLPKSolverLP) the numeric LP solver backend\n\nOutput\n\nThe polyhedron obtained by removing the redundant constraints in P.\n\nAlgorithm\n\nIf the polyhedron P has m constraints and its dimension is n, this function checks one by one if each of the m constraints is implied by the remaining ones. To check if the k-th constraint is redundant, an LP is formulated.\n\nFor details, see Fukuda\'s Polyhedra FAQ.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Constraint-representation-2",
    "page": "Common Set Representations",
    "title": "Constraint representation",
    "category": "section",
    "text": "Convex polytopes are bounded polyhedra. The types HPolytope and HPolyhedron are used to represent polytopes and general polyhedra respectively, the difference being that for HPolytope there is a running assumption about the boundedness of the set.HPolytope\nHPolyhedronThe following methods are shared between HPolytope and HPolyhedron.dim(::HPoly{Real})\nρ(::AbstractVector{Real}, ::HPoly{Real})\nσ(::AbstractVector{Real}, ::HPoly{Real})\n∈(::AbstractVector{Real}, ::HPoly{Real})\naddconstraint!(::HPoly{Real}, ::LinearConstraint{Real})\nconstraints_list(::HPoly{Real})\ncopy(P::PT) where {N, PT<:HPoly{N}}\ntosimplehrep(::HPoly{Real})\ntohrep(::HPoly{Real})\nisempty(::HPoly{N}) where {N<:Real}\nconvex_hull(::HPoly{Real}, ::HPoly{Real})\ncartesian_product(::HPoly{N}, ::HPoly{N}) where {N<:Real}\ntovrep(::HPoly{Real})\npolyhedron(::HPoly)\nremove_redundant_constraints\nremove_redundant_constraints!Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:linear_map"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{HPolytope}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{HPolytope}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::HPolytope{N}\n\nCreate a random polytope in constraint representation.\n\nInput\n\nHPolytope    – type for dispatch\nN            – (optional, default: Float64) numeric type\ndim          – (optional, default: 2) dimension\nrng          – (optional, default: GLOBAL_RNG) random number generator\nseed         – (optional, default: nothing) seed for reseeding\nnum_vertices – (optional, default: -1) upper bound on the number of                   vertices of the polytope (see comment below)\n\nOutput\n\nA random polytope in constraint representation.\n\nAlgorithm\n\nWe create a random polytope in vertex representation and convert it to constraint representation (hence the argument num_vertices). See rand(::Type{VPolytope}).\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{HPolytope{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(P::HPolytope{N};\n              [backend]=default_polyhedra_backend(P, N),\n              [prunefunc]=removevredundancy!)::Vector{Vector{N}} where\n              {N<:Real}\n\nReturn the list of vertices of a polytope in constraint representation.\n\nInput\n\nP         – polytope in constraint representation\nbackend   – (optional, default: default_polyhedra_backend(P, N))                 the polyhedral computations backend\nprunefunc – (optional, default: removevredundancy!) function to                post-process the output of vreps\n\nOutput\n\nList of vertices.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Polytopes-in-constraint-representation-1",
    "page": "Common Set Representations",
    "title": "Polytopes in constraint representation",
    "category": "section",
    "text": "The following methods are specific for HPolytope.rand(::Type{HPolytope})\nvertices_list(::HPolytope{Real})Inherited from AbstractPolytope:singleton_listThe following methods are specific for polytopes."
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{HPolyhedron}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{HPolyhedron}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::HPolyhedron{N}\n\nCreate a polyhedron.\n\nInput\n\nHPolyhedron – type for dispatch\nN           – (optional, default: Float64) numeric type\ndim         – (optional, default: 2) dimension (is ignored)\nrng         – (optional, default: GLOBAL_RNG) random number generator\nseed        – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA polyhedron.\n\nAlgorithm\n\nWe first create a random polytope and then randomly remove some of the constraints.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{HPolyhedron{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(P::HPolyhedron{N}) where {N<:Real}\n\nReturn the list of vertices of a polyhedron in constraint representation.\n\nInput\n\nP – polyhedron in constraint representation\n\nOutput\n\nThis function returns an error because the polyhedron is possibly unbounded. If P is known to be bounded, try converting to HPolytope first:\n\njulia> P = HPolyhedron([HalfSpace([1.0, 0.0], 1.0),\n                        HalfSpace([0.0, 1.0], 1.0),\n                        HalfSpace([-1.0, 0.0], 1.0),\n                        HalfSpace([0.0, -1.0], 1.0)]);\n\njulia> P_as_polytope = convert(HPolytope, P);\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Union{Tuple{HPolyhedron{N}}, Tuple{N}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "method",
    "text": "singleton_list(P::HPolyhedron{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polyhedron in H-representation as a list of singletons.\n\nInput\n\nP – polytope in constraint representation\n\nOutput\n\nThis function returns an error because the polyhedron is possibly unbounded. If P is known to be bounded, try converting to HPolytope first.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Polyhedra-1",
    "page": "Common Set Representations",
    "title": "Polyhedra",
    "category": "section",
    "text": "The following methods are specific for HPolyhedron.rand(::Type{HPolyhedron})\nvertices_list(::HPolyhedron{Real})\nsingleton_list(::HPolyhedron{N}) where {N<:Real}"
},

{
    "location": "lib/representations.html#LazySets.VPolytope",
    "page": "Common Set Representations",
    "title": "LazySets.VPolytope",
    "category": "type",
    "text": "VPolytope{N<:Real} <: AbstractPolytope{N}\n\nType that represents a convex polytope in V-representation.\n\nFields\n\nvertices – the list of vertices\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{VPolytope}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(P::VPolytope)::Int\n\nReturn the dimension of a polytope in V-representation.\n\nInput\n\nP  – polytope in V-representation\n\nOutput\n\nThe ambient dimension of the polytope in V-representation. If it is empty, the result is -1.\n\nExamples\n\njulia> v = VPolytope();\n\njulia> dim(v) > 0\nfalse\n\njulia> v = VPolytope([ones(3)])\nVPolytope{Float64}(Array{Float64,1}[[1.0, 1.0, 1.0]])\n\njulia> dim(v) == 3\ntrue\n\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},VPolytope{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, P::VPolytope{N}; algorithm=\"hrep\") where {N<:Real}\n\nReturn the support vector of a polyhedron (in V-representation) in a given direction.\n\nInput\n\nd         – direction\nP         – polyhedron in V-representation\nalgorithm – (optional, default: \'hrep\') method to compute the support vector\n\nOutput\n\nThe support vector in the given direction.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{VPolytope}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{VPolytope}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::VPolytope{N}\n\nCreate a random polytope in vertex representation.\n\nInput\n\nVPolytope    – type for dispatch\nN            – (optional, default: Float64) numeric type\ndim          – (optional, default: 2) dimension\nrng          – (optional, default: GLOBAL_RNG) random number generator\nseed         – (optional, default: nothing) seed for reseeding\nnum_vertices – (optional, default: -1) upper bound on the number of                   vertices of the polytope (see comment below)\n\nOutput\n\nA random polytope in vertex representation.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1.\n\nThe number of vertices can be controlled with the argument num_vertices. For a negative value we choose a random number in the range dim:5*dim (except if dim == 1, in which case we choose in the range 1:2). Note that we do not guarantee that the vertices are not redundant.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{VPolytope}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(P::VPolytope{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a polytope in V-representation.\n\nInput\n\nP – polytope in vertex representation\n\nOutput\n\nList of vertices.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.cartesian_product-Union{Tuple{N}, Tuple{VPolytope{N},VPolytope{N}}} where N",
    "page": "Common Set Representations",
    "title": "LazySets.cartesian_product",
    "category": "method",
    "text": "cartesian_product(P1::VPolytope{N}, P2::VPolytope{N};\n                  [backend]=default_polyhedra_backend(P1, N)) where {N}\n\nCompute the Cartesian product of two polytopes in V-representation.\n\nInput\n\nP1         – polytope\nP2         – another polytope\nbackend    – (optional, default: default_polyhedra_backend(P1, N)) the polyhedral                 computations backend, see Polyhedra\'s documentation                 for further information\n\nOutput\n\nThe VPolytope obtained by the concrete Cartesian product of P1 and P2.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Polyhedra.polyhedron-Tuple{VPolytope}",
    "page": "Common Set Representations",
    "title": "Polyhedra.polyhedron",
    "category": "method",
    "text": "polyhedron(P::HPoly{N}, [backend]=default_polyhedra_backend(P, N)) where {N}\n\nReturn an HRep polyhedron from Polyhedra.jl given a polytope in H-representation.\n\nInput\n\nP       – polytope\nbackend – (optional, default: call default_polyhedra_backend(P, N))               the polyhedral computations backend\n\nOutput\n\nAn HRep polyhedron.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\npolyhedron(P::VPolytope{N}, [backend]=default_polyhedra_backend(P, N)) where {N}\n\nReturn an VRep polyhedron from Polyhedra.jl given a polytope in V-representation.\n\nInput\n\nP       – polytope\nbackend – (optional, default: default_polyhedra_backend(P, N)) the polyhedral              computations backend, see Polyhedra\'s documentation              for further information\n\nOutput\n\nA VRep polyhedron.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Vertex-representation-2",
    "page": "Common Set Representations",
    "title": "Vertex representation",
    "category": "section",
    "text": "VPolytope\ndim(::VPolytope)\nσ(::AbstractVector{Real}, ::VPolytope{Real})\nrand(::Type{VPolytope})\nvertices_list(::VPolytope)\ncartesian_product(::VPolytope{N}, ::VPolytope{N}) where N\npolyhedron(::VPolytope)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:isempty\nsingleton_list\nlinear_map"
},

{
    "location": "lib/representations.html#LazySets.Singleton",
    "page": "Common Set Representations",
    "title": "LazySets.Singleton",
    "category": "type",
    "text": "Singleton{N<:Real} <: AbstractSingleton{N}\n\nType that represents a singleton, that is, a set with a unique element.\n\nFields\n\nelement – the only element of the set\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Singleton}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Singleton}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Singleton{N}\n\nCreate a random singleton.\n\nInput\n\nSingleton – type for dispatch\nN         – (optional, default: Float64) numeric type\ndim       – (optional, default: 2) dimension\nrng       – (optional, default: GLOBAL_RNG) random number generator\nseed      – (optional, default: nothing) seed for reseeding\n\nOutput\n\nA random singleton.\n\nAlgorithm\n\nThe element is a normally distributed vector with entries of mean 0 and standard deviation 1.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{Singleton}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "method",
    "text": "element(S::Singleton{N})::Vector{N} where {N<:Real}\n\nReturn the element of a singleton.\n\nInput\n\nS – singleton\n\nOutput\n\nThe element of the singleton.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{Singleton,Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "method",
    "text": "element(S::Singleton{N}, i::Int)::N where {N<:Real}\n\nReturn the i-th entry of the element of a singleton.\n\nInput\n\nS – singleton\ni – dimension\n\nOutput\n\nThe i-th entry of the element of the singleton.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Singleton-1",
    "page": "Common Set Representations",
    "title": "Singleton",
    "category": "section",
    "text": "Singleton\nrand(::Type{Singleton})\nelement(::Singleton)\nelement(::Singleton, ::Int)Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_listInherited from AbstractCentrallySymmetricPolytope:dim\nisemptyInherited from AbstractHyperrectangle:norm\nradius\nhigh\nlowInherited from AbstractSingleton:σ\n∈\nan_element\ncenter\nvertices_list\nradius_hyperrectangle\nradius_hyperrectangle\nlinear_map"
},

{
    "location": "lib/representations.html#LazySets.ZeroSet",
    "page": "Common Set Representations",
    "title": "LazySets.ZeroSet",
    "category": "type",
    "text": "ZeroSet{N<:Real} <: AbstractSingleton{N}\n\nType that represents the zero set, i.e., the set that only contains the origin.\n\nFields\n\ndim – the ambient dimension of this zero set\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{ZeroSet}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(Z::ZeroSet)::Int\n\nReturn the ambient dimension of this zero set.\n\nInput\n\nZ – a zero set, i.e., a set that only contains the origin\n\nOutput\n\nThe ambient dimension of the zero set.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Union{Tuple{N}, Tuple{AbstractArray{N,1},ZeroSet{N}}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, Z::ZeroSet{N}) where {N<:Real}\n\nReturn the support vector of a zero set.\n\nInput\n\nZ – a zero set, i.e., a set that only contains the origin\n\nOutput\n\nThe returned value is the origin since it is the only point that belongs to this set.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Union{Tuple{N}, Tuple{AbstractArray{N,1},ZeroSet{N}}} where N<:Real",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, Z::ZeroSet{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a zero set.\n\nInput\n\nx – point/vector\nZ – zero set\n\nOutput\n\ntrue iff x  Z.\n\nExamples\n\njulia> Z = ZeroSet(2);\n\njulia> ∈([1.0, 0.0], Z)\nfalse\njulia> ∈([0.0, 0.0], Z)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{ZeroSet}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{ZeroSet}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::ZeroSet{N}\n\nCreate a zero set (note that there is nothing to randomize).\n\nInput\n\nZeroSet – type for dispatch\nN       – (optional, default: Float64) numeric type\ndim     – (optional, default: 2) dimension\nrng     – (optional, default: GLOBAL_RNG) random number generator\nseed    – (optional, default: nothing) seed for reseeding\n\nOutput\n\nThe (only) zero set of the given numeric type and dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{ZeroSet}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "method",
    "text": "element(S::ZeroSet{N})::Vector{N} where {N<:Real}\n\nReturn the element of a zero set.\n\nInput\n\nS – zero set\n\nOutput\n\nThe element of the zero set, i.e., a zero vector.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{ZeroSet,Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "method",
    "text": "element(S::ZeroSet{N}, ::Int)::N where {N<:Real}\n\nReturn the i-th entry of the element of a zero set.\n\nInput\n\nS – zero set\ni – dimension\n\nOutput\n\nThe i-th entry of the element of the zero set, i.e., 0.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.linear_map-Union{Tuple{N}, Tuple{AbstractArray{T,2} where T,ZeroSet{N}}} where N<:Real",
    "page": "Common Set Representations",
    "title": "LazySets.linear_map",
    "category": "method",
    "text": "linear_map(M::AbstractMatrix, Z::ZeroSet{N}) where {N<:Real}\n\nConcrete linear map of a zero set.\n\nInput\n\nM – matrix\nZ – zero set\n\nOutput\n\nThe zero set whose dimension matches the output dimension of the given matrix.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Zero-set-1",
    "page": "Common Set Representations",
    "title": "Zero set",
    "category": "section",
    "text": "ZeroSet\ndim(::ZeroSet)\nσ(::AbstractVector{N}, ::ZeroSet{N}) where {N<:Real}\n∈(::AbstractVector{N}, ::ZeroSet{N}) where {N<:Real}\nrand(::Type{ZeroSet})\nelement(::ZeroSet)\nelement(::ZeroSet, ::Int)\nlinear_map(::AbstractMatrix, ::ZeroSet{N}) where {N<:Real}Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_listInherited from AbstractCentrallySymmetricPolytope:isemptyInherited from AbstractHyperrectangle:norm\nradius\nhigh\nlowInherited from AbstractSingleton:radius_hyperrectangle\nradius_hyperrectangle\nvertices_list\ncenter\nan_element"
},

{
    "location": "lib/representations.html#LazySets.Zonotope",
    "page": "Common Set Representations",
    "title": "LazySets.Zonotope",
    "category": "type",
    "text": "Zonotope{N<:Real} <: AbstractCentrallySymmetricPolytope{N}\n\nType that represents a zonotope.\n\nFields\n\ncenter     – center of the zonotope\ngenerators – matrix; each column is a generator of the zonotope\n\nNotes\n\nMathematically, a zonotope is defined as the set\n\nZ = left c + _i=1^p ξ_i g_i ξ_i in -1 1  i = 1 p right\n\nwhere c in mathbbR^n is its center and g_i_i=1^p, g_i in mathbbR^n, is the set of generators. This characterization defines a zonotope as the finite Minkowski sum of line segments. Zonotopes can be equivalently described as the image of a unit infinity-norm ball in mathbbR^n by an affine transformation.\n\nZonotope(center::AbstractVector{N},           generators::AbstractMatrix{N}) where {N<:Real}\nZonotope(center::AbstractVector{N},           generators_list::AbstractVector{T}          ) where {N<:Real, T<:AbstractVector{N}}\n\nExamples\n\nA two-dimensional zonotope with given center and set of generators:\n\njulia> Z = Zonotope([1.0, 0.0], [0.1 0.0; 0.0 0.1])\nZonotope{Float64}([1.0, 0.0], [0.1 0.0; 0.0 0.1])\njulia> dim(Z)\n2\n\nCompute its vertices:\n\njulia> vertices_list(Z)\n4-element Array{Array{Float64,1},1}:\n [1.1, 0.1]\n [0.9, 0.1]\n [1.1, -0.1]\n [0.9, -0.1]\n\nEvaluate the support vector in a given direction:\n\njulia> σ([1., 1.], Z)\n2-element Array{Float64,1}:\n 1.1\n 0.1\n\nAlternative constructor: A zonotope in two dimensions with three generators:\n\njulia> Z = Zonotope(ones(2), [[1., 0.], [0., 1.], [1., 1.]])\nZonotope{Float64}([1.0, 1.0], [1.0 0.0 1.0; 0.0 1.0 1.0])\njulia> Z.generators\n2×3 Array{Float64,2}:\n 1.0  0.0  1.0\n 0.0  1.0  1.0\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Real,1},Zonotope{Real}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, Z::Zonotope{N}) where {N<:Real}\n\nReturn the support vector of a zonotope in a given direction.\n\nInput\n\nd – direction\nZ – zonotope\n\nOutput\n\nSupport vector in the given direction. If the direction has norm zero, the vertex with ξ_i = 1    i = 1 p is returned.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Real,1},Zonotope{Real}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, Z::Zonotope{N};\n  solver=GLPKSolverLP(method=:Simplex))::Bool where {N<:Real}\n\nCheck whether a given point is contained in a zonotope.\n\nInput\n\nx      – point/vector\nZ      – zonotope\nsolver – (optional, default: GLPKSolverLP(method=:Simplex)) the backend             used to solve the linear program\n\nOutput\n\ntrue iff x  Z.\n\nExamples\n\njulia> Z = Zonotope([1.0, 0.0], [0.1 0.0; 0.0 0.1]);\n\njulia> ∈([1.0, 0.2], Z)\nfalse\njulia> ∈([1.0, 0.1], Z)\ntrue\n\nAlgorithm\n\nThe membership problem is computed by stating and solving the following linear program with the simplex method. Let p and n be the number of generators and ambient dimension, respectively. We consider the minimization of x_0 in the p+1-dimensional space of elements (x_0 ξ_1  ξ_p) constrained to 0  x_0  , ξ_i  -1 1 for all i = 1  p, and such that x-c = Gξ holds. If a feasible solution exists, the optimal value x_0 = 0 is achieved.\n\nNotes\n\nThis function is parametric in the number type N. For exact arithmetic use an appropriate backend, e.g. solver=GLPKSolverLP(method=:Exact).\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.rand-Tuple{Type{Zonotope}}",
    "page": "Common Set Representations",
    "title": "Base.rand",
    "category": "method",
    "text": "rand(::Type{Zonotope}; [N]::Type{<:Real}=Float64, [dim]::Int=2,\n     [rng]::AbstractRNG=GLOBAL_RNG, [seed]::Union{Int, Nothing}=nothing\n    )::Zonotope{N}\n\nCreate a random zonotope.\n\nInput\n\nZonotope       – type for dispatch\nN              – (optional, default: Float64) numeric type\ndim            – (optional, default: 2) dimension\nrng            – (optional, default: GLOBAL_RNG) random number generator\nseed           – (optional, default: nothing) seed for reseeding\nnum_generators – (optional, default: -1) number of generators of the                     zonotope (see comment below)\n\nOutput\n\nA random zonotope.\n\nAlgorithm\n\nAll numbers are normally distributed with mean 0 and standard deviation 1.\n\nThe number of generators can be controlled with the argument num_generators. For a negative value we choose a random number in the range dim:2*dim (except if dim == 1, in which case we only create a single generator).\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(Z::Zonotope{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the vertices of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nList of vertices as a vector of vectors.\n\nAlgorithm\n\nIf the zonotope has p generators, each of the 2^p vertices is computed by taking the sum of the center and a linear combination of generators, where the combination factors are ξ_i  -1 1.\n\nNotes\n\nFor high dimensions, it would be preferable to develop a vertex_iterator approach.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "method",
    "text": "center(Z::Zonotope{N})::Vector{N} where {N<:Real}\n\nReturn the center of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nThe center of the zonotope.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.order-Tuple{Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.order",
    "category": "method",
    "text": "order(Z::Zonotope)::Rational\n\nReturn the order of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nA rational number representing the order of the zonotope.\n\nNotes\n\nThe order of a zonotope is defined as the quotient of its number of generators and its dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.minkowski_sum-Tuple{Zonotope,Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.minkowski_sum",
    "category": "method",
    "text": "minkowski_sum(Z1::Zonotope, Z2::Zonotope)\n\nConcrete Minkowski sum of a pair of zonotopes.\n\nInput\n\nZ1 – one zonotope\nZ2 – another zonotope\n\nOutput\n\nThe zonotope obtained by summing the centers and concatenating the generators of Z_1 and Z_2.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.linear_map-Tuple{AbstractArray{T,2} where T,Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.linear_map",
    "category": "method",
    "text": "linear_map(M::AbstractMatrix, Z::Zonotope)\n\nConcrete linear map of a zonotope.\n\nInput\n\nM – matrix\nZ – zonotope\n\nOutput\n\nThe zonotope obtained by applying the linear map to the center and generators of Z.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.scale-Tuple{Real,Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.scale",
    "category": "method",
    "text": "scale(α::Real, Z::Zonotope)\n\nConcrete scaling of a zonotope.\n\nInput\n\nα – scalar\nZ – zonotope\n\nOutput\n\nThe zonotope obtained by applying the numerical scale to the center and generators of Z.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.ngens-Tuple{Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.ngens",
    "category": "method",
    "text": "ngens(Z::Zonotope)::Int\n\nReturn the number of generators of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nInteger representing the number of generators.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.reduce_order-Tuple{Zonotope,Any}",
    "page": "Common Set Representations",
    "title": "LazySets.reduce_order",
    "category": "method",
    "text": "reduce_order(Z::Zonotope, r)::Zonotope\n\nReduce the order of a zonotope by overapproximating with a zonotope with less generators.\n\nInput\n\nZ – zonotope\nr – desired order\n\nOutput\n\nA new zonotope with less generators, if possible.\n\nAlgorithm\n\nThis function implements the algorithm described in A. Girard\'s Reachability of Uncertain Linear Systems Using Zonotopes, HSCC. Vol. 5. 2005.\n\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Zonotope-1",
    "page": "Common Set Representations",
    "title": "Zonotope",
    "category": "section",
    "text": "Zonotope\nσ(::AbstractVector{Real}, ::Zonotope{Real})\n∈(::AbstractVector{Real}, ::Zonotope{Real})\nrand(::Type{Zonotope})\nvertices_list(::Zonotope)\ncenter(::Zonotope)\norder(::Zonotope)\nminkowski_sum(::Zonotope, ::Zonotope)\nlinear_map(::AbstractMatrix, ::Zonotope)\nscale(::Real, ::Zonotope)\nngens(::Zonotope)\nreduce_order(::Zonotope, r)Inherited from LazySet:norm\nradius\ndiameterInherited from AbstractPolytope:singleton_listInherited from AbstractCentrallySymmetricPolytope:dim\nisempty\nan_element"
},

{
    "location": "lib/operations.html#",
    "page": "Common Set Operations",
    "title": "Common Set Operations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/operations.html#Common-Set-Operations-1",
    "page": "Common Set Operations",
    "title": "Common Set Operations",
    "category": "section",
    "text": "This section of the manual describes the basic symbolic types describing operations between sets.Pages = [\"operations.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\n    using Compat.SparseArrays, Compat.LinearAlgebra\nend"
},

{
    "location": "lib/operations.html#Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "Cartesian Product",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.CartesianProduct",
    "page": "Common Set Operations",
    "title": "LazySets.CartesianProduct",
    "category": "type",
    "text": "CartesianProduct{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents a Cartesian product of two convex sets.\n\nFields\n\nX – first convex set\nY – second convex set\n\nNotes\n\nThe Cartesian product of three elements is obtained recursively. See also CartesianProductArray for an implementation of a Cartesian product of many sets without recursion, instead using an array.\n\nThe EmptySet is the absorbing element for CartesianProduct.\n\nConstructors:\n\nCartesianProduct{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}}(X1::S1, X2::S2) – default constructor\nCartesianProduct(Xarr::Vector{S}) where {S<:LazySet} – constructor from an array of convex sets\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LinearAlgebra.:×-Tuple{LazySet,LazySet}",
    "page": "Common Set Operations",
    "title": "LinearAlgebra.:×",
    "category": "method",
    "text": "×\n\nAlias for the binary Cartesian product.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{LazySet,LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(X::LazySet, Y::LazySet)\n\nAlias for the binary Cartesian product.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{CartesianProduct}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(cp::CartesianProduct)::Int\n\nReturn the dimension of a Cartesian product.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\nThe ambient dimension of the Cartesian product.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},CartesianProduct{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, cp::CartesianProduct{N}) where {N<:Real}\n\nReturn the support vector of a Cartesian product.\n\nInput\n\nd  – direction\ncp – Cartesian product\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Real,1},CartesianProduct{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{<:Real}, cp::CartesianProduct)::Bool\n\nCheck whether a given point is contained in a Cartesian product.\n\nInput\n\nx  – point/vector\ncp – Cartesian product\n\nOutput\n\ntrue iff x  cp.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{CartesianProduct}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(cp::CartesianProduct)::Bool\n\nReturn if a Cartesian product is empty or not.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\ntrue iff any of the sub-blocks is empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.constraints_list-Tuple{CartesianProduct{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(cp::CartesianProduct{N, <:LazySet{N}}\n                )::Vector{LinearConstraint{N}} where N<:Real\n\nReturn the list of constraints of a (polytopic) Cartesian product.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\nA list of constraints.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.vertices_list-Tuple{CartesianProduct{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(cp::CartesianProduct{N})::Vector{Vector{N}} where N<:Real\n\nReturn the list of vertices of a (polytopic) Cartesian product.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\nA list of vertices.\n\nAlgorithm\n\nWe assume that the underlying sets are polytopic. Then the high-dimensional set of vertices is just the Cartesian product of the low-dimensional sets of vertices.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "Binary Cartesian Product",
    "category": "section",
    "text": "CartesianProduct\n×(::LazySet, ::LazySet)\n*(::LazySet, ::LazySet)\ndim(::CartesianProduct)\nσ(::AbstractVector{Real}, ::CartesianProduct{Real})\n∈(::AbstractVector{Real}, ::CartesianProduct{Real})\nisempty(::CartesianProduct)\nconstraints_list(::CartesianProduct{Real})\nvertices_list(::CartesianProduct{Real})Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.CartesianProductArray",
    "page": "Common Set Operations",
    "title": "LazySets.CartesianProductArray",
    "category": "type",
    "text": "CartesianProductArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the Cartesian product of a finite number of convex sets.\n\nFields\n\narray – array of sets\n\nNotes\n\nThe EmptySet is the absorbing element for CartesianProductArray.\n\nConstructors:\n\nCartesianProductArray(array::Vector{<:LazySet}) – default constructor\nCartesianProductArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty product with optional size hint and numeric type\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{CartesianProductArray}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(cpa::CartesianProductArray)::Int\n\nReturn the dimension of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe ambient dimension of the Cartesian product of a finite number of convex sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},CartesianProductArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, cpa::CartesianProductArray{N}) where {N<:Real}\n\nSupport vector of a Cartesian product array.\n\nInput\n\nd   – direction\ncpa – Cartesian product array\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the product sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Real,1},CartesianProductArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, cpa::CartesianProductArray{N, <:LazySet{N}}\n )::Bool  where {N<:Real}\n\nCheck whether a given point is contained in a Cartesian product of a finite number of sets.\n\nInput\n\nx   – point/vector\ncpa – Cartesian product array\n\nOutput\n\ntrue iff x  textcpa.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{CartesianProductArray}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(cpa::CartesianProductArray)::Bool\n\nReturn if a Cartesian product is empty or not.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\ntrue iff any of the sub-blocks is empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.constraints_list-Tuple{CartesianProductArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.constraints_list",
    "category": "method",
    "text": "constraints_list(cpa::CartesianProductArray{N, <:LazySet{N}}\n                )::Vector{LinearConstraint{N}} where N<:Real\n\nReturn the list of constraints of a (polytopic) Cartesian product of a finite number of sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nA list of constraints.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.vertices_list-Tuple{CartesianProductArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(cpa::CartesianProductArray{N})::Vector{Vector{N}} where N<:Real\n\nReturn the list of vertices of a (polytopic) Cartesian product of a finite number of sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nA list of vertices.\n\nAlgorithm\n\nWe assume that the underlying sets are polytopic. Then the high-dimensional set of vertices is just the Cartesian product of the low-dimensional sets of vertices.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{CartesianProductArray}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\n\n\narray(ia::IntersectionArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of an intersection of a finite number of convex sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe array of an intersection of a finite number of convex sets.\n\n\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n\n\narray(cms::CacheMinkowskiSum{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe array of a caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "n-ary Cartesian Product",
    "category": "section",
    "text": "CartesianProductArray\ndim(::CartesianProductArray)\nσ(::AbstractVector{Real}, ::CartesianProductArray{Real})\n∈(::AbstractVector{Real}, ::CartesianProductArray{Real})\nisempty(::CartesianProductArray)\nconstraints_list(::CartesianProductArray{Real})\nvertices_list(::CartesianProductArray{Real})\narray(::CartesianProductArray)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "Convex Hull",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.ConvexHull",
    "page": "Common Set Operations",
    "title": "LazySets.ConvexHull",
    "category": "type",
    "text": "ConvexHull{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents the convex hull of the union of two convex sets.\n\nFields\n\nX – convex set\nY – convex set\n\nNotes\n\nThe EmptySet is the neutral element for ConvexHull.\n\nExamples\n\nConvex hull of two 100-dimensional Euclidean balls:\n\njulia> b1, b2 = Ball2(zeros(100), 0.1), Ball2(4*ones(100), 0.2);\n\njulia> c = ConvexHull(b1, b2);\n\njulia> typeof(c)\nConvexHull{Float64,Ball2{Float64},Ball2{Float64}}\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.CH",
    "page": "Common Set Operations",
    "title": "LazySets.CH",
    "category": "type",
    "text": "CH\n\nAlias for ConvexHull.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{ConvexHull}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(ch::ConvexHull)::Int\n\nReturn the dimension of a convex hull of two convex sets.\n\nInput\n\nch – convex hull of two convex sets\n\nOutput\n\nThe ambient dimension of the convex hull of two convex sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},ConvexHull{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, ch::ConvexHull{N}) where {N<:Real}\n\nReturn the support vector of a convex hull of two convex sets in a given direction.\n\nInput\n\nd  – direction\nch – convex hull of two convex sets\n\nOutput\n\nThe support vector of the convex hull in the given direction.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{ConvexHull}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(ch::ConvexHull)::Bool\n\nReturn if a convex hull of two convex sets is empty or not.\n\nInput\n\nch – convex hull\n\nOutput\n\ntrue iff both wrapped sets are empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "Binary Convex Hull",
    "category": "section",
    "text": "ConvexHull\nCH\ndim(::ConvexHull)\nσ(::AbstractVector{Real}, ::ConvexHull{Real})\nisempty(::ConvexHull)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.ConvexHullArray",
    "page": "Common Set Operations",
    "title": "LazySets.ConvexHullArray",
    "category": "type",
    "text": "ConvexHullArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the symbolic convex hull of a finite number of convex sets.\n\nFields\n\narray – array of sets\n\nNotes\n\nThe EmptySet is the neutral element for ConvexHullArray.\n\nConstructors:\n\nConvexHullArray(array::Vector{<:LazySet}) – default constructor\nConvexHullArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty hull with optional size hint and numeric type\n\nExamples\n\nConvex hull of 100 two-dimensional balls whose centers follows a sinusoidal:\n\njulia> b = [Ball2([2*pi*i/100, sin(2*pi*i/100)], 0.05) for i in 1:100];\n\njulia> c = ConvexHullArray(b);\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.CHArray",
    "page": "Common Set Operations",
    "title": "LazySets.CHArray",
    "category": "type",
    "text": "CHArray\n\nAlias for ConvexHullArray.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{ConvexHullArray}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(cha::ConvexHullArray)::Int\n\nReturn the dimension of the convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe ambient dimension of the convex hull of a finite number of convex sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},ConvexHullArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, cha::ConvexHullArray{N}) where {N<:Real}\n\nReturn the support vector of a convex hull array in a given direction.\n\nInput\n\nd   – direction\ncha – convex hull array\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{ConvexHullArray}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\n\n\narray(ia::IntersectionArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of an intersection of a finite number of convex sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe array of an intersection of a finite number of convex sets.\n\n\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n\n\narray(cms::CacheMinkowskiSum{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe array of a caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{ConvexHullArray}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(cha::ConvexHullArray)::Bool\n\nReturn if a convex hull array is empty or not.\n\nInput\n\ncha – convex hull array\n\nOutput\n\ntrue iff all wrapped sets are empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "n-ary Convex Hull",
    "category": "section",
    "text": "ConvexHullArray\nCHArray\ndim(::ConvexHullArray)\nσ(::AbstractVector{Real}, ::ConvexHullArray{Real})\narray(::ConvexHullArray)\nisempty(::ConvexHullArray)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.convex_hull",
    "page": "Common Set Operations",
    "title": "LazySets.convex_hull",
    "category": "function",
    "text": "convex_hull(P1::HPoly{N}, P2::HPoly{N};\n           [backend]=default_polyhedra_backend(P1, N)) where {N}\n\nCompute the convex hull of the set union of two polyhedra in H-representation.\n\nInput\n\nP1         – polyhedron\nP2         – another polyhedron\nbackend    – (optional, default: default_polyhedra_backend(P1, N))                 the polyhedral computations backend\n\nOutput\n\nThe HPolyhedron (resp. HPolytope) obtained by the concrete convex hull of P1 and P2.\n\nNotes\n\nFor further information on the supported backends see Polyhedra\'s documentation.\n\n\n\n\n\nconvex_hull(points::Vector{S}; [algorithm]::String=\"monotone_chain\"\n           )::Vector{S} where {N<:Real, S<:AbstractVector{N}}\n\nCompute the convex hull of points in the plane.\n\nInput\n\npoints    – list of 2D vectors\nalgorithm – (optional, default: \"monotone_chain\") the convex hull                algorithm, valid options are:\n\"monotone_chain\"\n\"monotone_chain_sorted\"\n\nOutput\n\nThe convex hull as a list of 2D vectors with the coordinates of the points.\n\nExamples\n\nCompute the convex hull of a random set of points:\n\njulia> points = [randn(2) for i in 1:30]; # 30 random points in 2D\n\njulia> hull = convex_hull(points);\n\njulia> typeof(hull)\nArray{Array{Float64,1},1}\n\nPlot both the random points and the computed convex hull polygon:\n\njulia> using Plots;\n\njulia> plot([Tuple(pi) for pi in points], seriestype=:scatter);\n\njulia> plot!(VPolygon(hull), alpha=0.2);\n\n\n\n\n\nconvex_hull(P1::VPolytope{N}, P2::VPolytope{N};\n            [backend]=default_polyhedra_backend(P1, N)) where {N}\n\nCompute the convex hull of the set union of two polytopes in V-representation.\n\nInput\n\nP1         – polytope\nP2         – another polytope\nbackend    – (optional, default: default_polyhedra_backend(P1, N)) the polyhedral                 computations backend, see Polyhedra\'s documentation                 for further information\n\nOutput\n\nThe VPolytope obtained by the concrete convex hull of P1 and P2.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.convex_hull!",
    "page": "Common Set Operations",
    "title": "LazySets.convex_hull!",
    "category": "function",
    "text": "convex_hull!(points::Vector{S}; [algorithm]::String=\"monotone_chain\"\n            )::Vector{S} where {N<:Real, S<:AbstractVector{N}}\n\nCompute the convex hull of points in the plane, in-place.\n\nInput\n\npoints    – list of 2D vectors (is modified)\nalgorithm – (optional, default: \"monotone_chain\") the convex hull                algorithm; valid options are:\n\"monotone_chain\"\n\"monotone_chain_sorted\"\n\nOutput\n\nThe convex hull as a list of 2D vectors with the coordinates of the points.\n\nNotes\n\nSee the non-modifying version convex_hull for more details.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.right_turn",
    "page": "Common Set Operations",
    "title": "LazySets.right_turn",
    "category": "function",
    "text": "right_turn(O::AbstractVector{N}, A::AbstractVector{N}, B::AbstractVector{N}\n          )::N where {N<:Real}\n\nDetermine if the acute angle defined by the three points O, A, B in the plane is a right turn (counter-clockwise) with respect to the center O.\n\nInput\n\nO – 2D center point\nA – 2D one point\nB – 2D another point\n\nOutput\n\nScalar representing the rotation.\n\nAlgorithm\n\nThe cross product is used to determine the sense of rotation. If the result is 0, the points are collinear; if it is positive, the three points constitute a positive angle of rotation around O from A to B; otherwise they constitute a negative angle.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.monotone_chain!",
    "page": "Common Set Operations",
    "title": "LazySets.monotone_chain!",
    "category": "function",
    "text": "monotone_chain!(points::Vector{S}; sort::Bool=true\n               )::Vector{S} where {N<:Real, S<:AbstractVector{N}}\n\nCompute the convex hull of points in the plane using Andrew\'s monotone chain method.\n\nInput\n\npoints – list of 2D vectors; is sorted in-place inside this function\nsort   – (optional, default: true) flag for sorting the vertices             lexicographically; sortedness is required for correctness\n\nOutput\n\nList of vectors containing the 2D coordinates of the corner points of the convex hull.\n\nNotes\n\nFor large sets of points, it is convenient to use static vectors to get maximum performance. For information on how to convert usual vectors into static vectors, see the type SVector provided by the StaticArrays package.\n\nAlgorithm\n\nThis function implements Andrew\'s monotone chain convex hull algorithm to construct the convex hull of a set of n points in the plane in O(n log n) time. For further details see Monotone chain\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Convex-Hull-Algorithms-1",
    "page": "Common Set Operations",
    "title": "Convex Hull Algorithms",
    "category": "section",
    "text": "convex_hull\nconvex_hull!\nright_turn\nmonotone_chain!"
},

{
    "location": "lib/operations.html#Intersection-1",
    "page": "Common Set Operations",
    "title": "Intersection",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#Binary-Intersection-1",
    "page": "Common Set Operations",
    "title": "Binary Intersection",
    "category": "section",
    "text": "Intersection\n∩(::LazySet, ::LazySet)\ndim(::Intersection)\nρ(::AbstractVector{N}, ::Intersection{N}) where {N<:Real}\nρ(::AbstractVector{N}, ::Intersection{N, <:LazySet{N}, <:Union{HalfSpace{N}, Hyperplane{N}, Line{N}}}) where {N<:Real}\nρ(::AbstractVector{N}, ::Intersection{N, <:LazySet{N}, <:AbstractPolytope{N}}) where {N<:Real}\nisempty(::Intersection)\nσ(::AbstractVector{Real}, ::Intersection{Real})\n∈(::AbstractVector{Real}, ::Intersection{Real})\nisempty_known(::Intersection)\nset_isempty!(::Intersection, ::Bool)\nswap(::Intersection)\nuse_precise_ρ\n_line_search\n_projectionInherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.IntersectionCache",
    "page": "Common Set Operations",
    "title": "LazySets.IntersectionCache",
    "category": "type",
    "text": "IntersectionCache\n\nContainer for information cached by a lazy Intersection object.\n\nFields\n\nisempty – is the intersection empty? There are three possible states,              encoded as Int8 values -1, 0, 1:\n-1 - it is currently unknown whether the intersection is empty or not\n0 - intersection is not empty\n1 - intersection is empty\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Intersection-cache-1",
    "page": "Common Set Operations",
    "title": "Intersection cache",
    "category": "section",
    "text": "IntersectionCache"
},

{
    "location": "lib/operations.html#LazySets.IntersectionArray",
    "page": "Common Set Operations",
    "title": "LazySets.IntersectionArray",
    "category": "type",
    "text": "IntersectionArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the intersection of a finite number of convex sets.\n\nFields\n\narray – array of convex sets\n\nNotes\n\nThis type assumes that the dimensions of all elements match.\n\nThe EmptySet is the absorbing element for IntersectionArray.\n\nConstructors:\n\nIntersectionArray(array::Vector{<:LazySet}) – default constructor\nIntersectionArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty sum with optional size hint and numeric type\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{IntersectionArray}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(ia::IntersectionArray)::Int\n\nReturn the dimension of an intersection of a finite number of sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe ambient dimension of the intersection of a finite number of sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},IntersectionArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{<:Real}, ia::IntersectionArray)::Vector{<:Real}\n\nReturn the support vector of an intersection of a finite number of sets in a given direction.\n\nInput\n\nd  – direction\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the individual sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{IntersectionArray}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\n\n\narray(ia::IntersectionArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of an intersection of a finite number of convex sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe array of an intersection of a finite number of convex sets.\n\n\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n\n\narray(cms::CacheMinkowskiSum{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe array of a caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Intersection-1",
    "page": "Common Set Operations",
    "title": "n-ary Intersection",
    "category": "section",
    "text": "IntersectionArray\ndim(::IntersectionArray)\nσ(::AbstractVector{Real}, ::IntersectionArray{Real})\narray(::IntersectionArray)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "Minkowski Sum",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.MinkowskiSum",
    "page": "Common Set Operations",
    "title": "LazySets.MinkowskiSum",
    "category": "type",
    "text": "MinkowskiSum{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents the Minkowski sum of two convex sets.\n\nFields\n\nX – first convex set\nY – second convex set\n\nNotes\n\nThe ZeroSet is the neutral element and the EmptySet is the absorbing element for MinkowskiSum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.:⊕-Tuple{LazySet,LazySet}",
    "page": "Common Set Operations",
    "title": "LazySets.:⊕",
    "category": "method",
    "text": "⊕(X::LazySet, Y::LazySet)\n\nUnicode alias constructor ⊕ (oplus) for the lazy Minkowski sum operator.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:+-Tuple{LazySet,LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:+",
    "category": "method",
    "text": "X + Y\n\nConvenience constructor for Minkowski sum.\n\nInput\n\nX – a convex set\nY – another convex set\n\nOutput\n\nThe symbolic Minkowski sum of X and Y.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{MinkowskiSum}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(ms::MinkowskiSum)::Int\n\nReturn the dimension of a Minkowski sum.\n\nInput\n\nms – Minkowski sum\n\nOutput\n\nThe ambient dimension of the Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},MinkowskiSum{Real,S1,S2} where S2<:LazySet{Real} where S1<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, ms::MinkowskiSum{N}) where {N<:Real}\n\nReturn the support vector of a Minkowski sum.\n\nInput\n\nd  – direction\nms – Minkowski sum\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the summand sets.\n\nAlgorithm\n\nThe support vector in direction d of the Minkowski sum of two sets X and Y is the sum of the support vectors of X and Y in direction d.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{MinkowskiSum}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(ms::MinkowskiSum)::Bool\n\nReturn if a Minkowski sum is empty or not.\n\nInput\n\nms – Minkowski sum\n\nOutput\n\ntrue iff any of the wrapped sets are empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "Binary Minkowski Sum",
    "category": "section",
    "text": "MinkowskiSum\n⊕(::LazySet, ::LazySet)\n+(::LazySet, ::LazySet)\ndim(::MinkowskiSum)\nσ(::AbstractVector{Real}, ::MinkowskiSum{Real})\nisempty(::MinkowskiSum)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.MinkowskiSumArray",
    "page": "Common Set Operations",
    "title": "LazySets.MinkowskiSumArray",
    "category": "type",
    "text": "MinkowskiSumArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the Minkowski sum of a finite number of convex sets.\n\nFields\n\narray – array of convex sets\n\nNotes\n\nThis type assumes that the dimensions of all elements match.\n\nThe ZeroSet is the neutral element and the EmptySet is the absorbing element for MinkowskiSumArray.\n\nConstructors:\n\nMinkowskiSumArray(array::Vector{<:LazySet}) – default constructor\nMinkowskiSumArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty sum with optional size hint and numeric type\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{MinkowskiSumArray}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(msa::MinkowskiSumArray)::Int\n\nReturn the dimension of a Minkowski sum of a finite number of sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe ambient dimension of the Minkowski sum of a finite number of sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},MinkowskiSumArray{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, msa::MinkowskiSumArray{N}) where {N<:Real}\n\nReturn the support vector of a Minkowski sum of a finite number of sets in a given direction.\n\nInput\n\nd   – direction\nmsa – Minkowski sum array\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the summand sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{MinkowskiSumArray}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(msa::MinkowskiSumArray)::Bool\n\nReturn if a Minkowski sum array is empty or not.\n\nInput\n\ncp – Minkowski sum array\n\nOutput\n\ntrue iff any of the wrapped sets are empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{MinkowskiSumArray}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\n\n\narray(ia::IntersectionArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of an intersection of a finite number of convex sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe array of an intersection of a finite number of convex sets.\n\n\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n\n\narray(cms::CacheMinkowskiSum{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe array of a caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "n-ary Minkowski Sum",
    "category": "section",
    "text": "MinkowskiSumArray\ndim(::MinkowskiSumArray)\nσ(::AbstractVector{Real}, ::MinkowskiSumArray{Real})\nisempty(::MinkowskiSumArray)\narray(::MinkowskiSumArray)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#LazySets.CacheMinkowskiSum",
    "page": "Common Set Operations",
    "title": "LazySets.CacheMinkowskiSum",
    "category": "type",
    "text": "CacheMinkowskiSum{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the Minkowski sum of a finite number of convex sets. Support vector queries are cached.\n\nFields\n\narray – array of convex sets\ncache – cache of support vector query results\n\nNotes\n\nThis type assumes that the dimensions of all elements match.\n\nThe ZeroSet is the neutral element and the EmptySet is the absorbing element for CacheMinkowskiSum.\n\nThe cache (field cache) is implemented as dictionary whose keys are directions and whose values are pairs (k, s) where k is the number of elements in the array array when the support vector was evaluated last time, and s is the support vector that was obtained. Thus this type assumes that array is not modified except by adding new sets at the end.\n\nConstructors:\n\nCacheMinkowskiSum(array::Vector{<:LazySet}) – default constructor\nCacheMinkowskiSum([n]::Int=0, [N]::Type=Float64) – constructor for an empty sum with optional size hint and numeric type\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{CacheMinkowskiSum}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(cms::CacheMinkowskiSum)::Int\n\nReturn the dimension of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe ambient dimension of the caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},CacheMinkowskiSum{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, cms::CacheMinkowskiSum{N}) where {N<:Real}\n\nReturn the support vector of a caching Minkowski sum in a given direction.\n\nInput\n\nd   – direction\ncms – caching Minkowski sum\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the summand sets.\n\nNotes\n\nThe result is cached, i.e., any further query with the same direction runs in constant time. When sets are added to the caching Minkowski sum, the query is only performed for the new sets.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{CacheMinkowskiSum}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(cms::CacheMinkowskiSum)::Bool\n\nReturn if a caching Minkowski sum array is empty or not.\n\nInput\n\ncp – caching Minkowski sum\n\nOutput\n\ntrue iff any of the wrapped sets are empty.\n\nNotes\n\nForgotten sets cannot be checked anymore. Usually they have been empty because otherwise the support vector query should have crashed before. In that case, the caching Minkowski sum should not be used further.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{CacheMinkowskiSum}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\n\n\narray(ia::IntersectionArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of an intersection of a finite number of convex sets.\n\nInput\n\nia – intersection of a finite number of convex sets\n\nOutput\n\nThe array of an intersection of a finite number of convex sets.\n\n\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n\n\narray(cms::CacheMinkowskiSum{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a caching Minkowski sum.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe array of a caching Minkowski sum.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.forget_sets!-Tuple{CacheMinkowskiSum}",
    "page": "Common Set Operations",
    "title": "LazySets.forget_sets!",
    "category": "method",
    "text": "forget_sets!(cms::CacheMinkowskiSum)::Int\n\nTell a caching Minkowski sum to forget the stored sets (but not the support vectors). Only those sets are forgotten such that for each cached direction the support vector has been computed before.\n\nInput\n\ncms – caching Minkowski sum\n\nOutput\n\nThe number of sets that have been forgotten.\n\nNotes\n\nThis function should only be used under the assertion that no new directions are queried in the future; otherwise such support vector results will be incorrect.\n\nThis implementation is optimistic and first tries to remove all sets. However, it also checks that for all cached directions the support vector has been computed before. If it finds that this is not the case, the implementation identifies the biggest index k such that the above holds for the k oldest sets, and then it only removes these. See the example below.\n\nExamples\n\njulia> x1 = BallInf(ones(3), 3.); x2 = Ball1(ones(3), 5.);\n\njulia> cms1 = CacheMinkowskiSum(2); cms2 = CacheMinkowskiSum(2);\n\njulia> d = ones(3);\n\njulia> a1 = array(cms1); a2 = array(cms2);\n\njulia> push!(a1, x1); push!(a2, x1);\n\njulia> σ(d, cms1); σ(d, cms2);\n\njulia> push!(a1, x2); push!(a2, x2);\n\njulia> σ(d, cms1);\n\njulia> idx1 = forget_sets!(cms1) # support vector was computed for both sets\n2\n\njulia> idx1 = forget_sets!(cms2) # support vector was only computed for first set\n1\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Minkowski-Sum-with-cache-1",
    "page": "Common Set Operations",
    "title": "n-ary Minkowski Sum with cache",
    "category": "section",
    "text": "CacheMinkowskiSum\ndim(::CacheMinkowskiSum)\nσ(::AbstractVector{Real}, ::CacheMinkowskiSum{Real})\nisempty(::CacheMinkowskiSum)\narray(::CacheMinkowskiSum)\nforget_sets!(::CacheMinkowskiSum)Inherited from LazySet:norm\nradius\ndiameter\nan_element"
},

{
    "location": "lib/operations.html#Maps-1",
    "page": "Common Set Operations",
    "title": "Maps",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.LinearMap",
    "page": "Common Set Operations",
    "title": "LazySets.LinearMap",
    "category": "type",
    "text": "LinearMap{N<:Real, S<:LazySet{N}, NM, MAT<:AbstractMatrix{NM}} <: LazySet{N}\n\nType that represents a linear transformation MS of a convex set S.\n\nFields\n\nM – matrix/linear map\nX – convex set\n\nNotes\n\nThis type is parametric in the elements of the linear map, NM, which is independent of the numeric type of the target set (N). Typically NM = N, but there may be exceptions, e.g., if NM is an interval that holds numbers of type N, where N is a floating point number type such as Float64.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{AbstractArray{Real,2},LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(M::AbstractMatrix, X::LazySet)\n\nReturn the linear map of a convex set.\n\nInput\n\nM – matrix/linear map\nX – convex set\n\nOutput\n\nA lazy linear map, i.e. a LinearMap instance.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{Real,LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(a::N, X::LazySet) where {N}\n\nReturn a linear map of a convex set by a scalar value.\n\nInput\n\na – scalar\nX – convex set\n\nOutput\n\nThe linear map of the convex set.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LinearMap}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(lm::LinearMap)::Int\n\nReturn the dimension of a linear map.\n\nInput\n\nlm – linear map\n\nOutput\n\nThe ambient dimension of the linear map.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},LinearMap{Real,S,NM,MAT} where MAT<:AbstractArray{NM,2} where NM where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, lm::LinearMap{N}) where {N<:Real}\n\nReturn the support vector of the linear map.\n\nInput\n\nd  – direction\nlm – linear map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf L = MS, where M is a matrix and S is a convex set, it follows that σ(d L) = Mσ(M^T d S) for any direction d.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Real,1},LinearMap{Real,LazySet{Real},Real,Array{Real,2}}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, lm::LinearMap{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a linear map of a convex set.\n\nInput\n\nx  – point/vector\nlm – linear map of a convex set\n\nOutput\n\ntrue iff x  lm.\n\nAlgorithm\n\nNote that x  MS iff M^-1x  S. This implementation does not explicitly invert the matrix, which is why it also works for non-square matrices.\n\nExamples\n\njulia> lm = LinearMap([2.0 0.0; 0.0 1.0], BallInf([1., 1.], 1.));\n\njulia> ∈([5.0, 1.0], lm)\nfalse\njulia> ∈([3.0, 1.0], lm)\ntrue\n\nAn example with non-square matrix:\n\njulia> B = BallInf(zeros(4), 1.);\n\njulia> M = [1. 0 0 0; 0 1 0 0]/2;\n\njulia> ∈([0.5, 0.5], M*B)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.an_element-Tuple{LinearMap}",
    "page": "Common Set Operations",
    "title": "LazySets.an_element",
    "category": "method",
    "text": "an_element(lm::LinearMap)\n\nReturn some element of a linear map.\n\nInput\n\nlm – linear map\n\nOutput\n\nAn element in the linear map. It relies on the an_element function of the wrapped set.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{LinearMap}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(lm::LinearMap)::Bool\n\nReturn if a linear map is empty or not.\n\nInput\n\nlm – linear map\n\nOutput\n\ntrue iff the wrapped set is empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.vertices_list-Tuple{LinearMap{Real,S,NM,MAT} where MAT<:AbstractArray{NM,2} where NM where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(lm::LinearMap{N})::Vector{Vector{N}} where N<:Real\n\nReturn the list of vertices of a (polytopic) linear map.\n\nInput\n\nlm – linear map\n\nOutput\n\nA list of vertices.\n\nAlgorithm\n\nWe assume that the underlying set X is polytopic. Then the result is just the linear map applied to the vertices of X.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Linear-Map-1",
    "page": "Common Set Operations",
    "title": "Linear Map",
    "category": "section",
    "text": "LinearMap\n*(::AbstractMatrix{Real}, ::LazySet{Real})\n*(::Real, ::LazySet{Real})\ndim(::LinearMap)\nσ(::AbstractVector{Real}, ::LinearMap{Real})\n∈(::AbstractVector{Real}, ::LinearMap{Real, LazySet{Real}, Real, Matrix{Real}})\nan_element(::LinearMap)\nisempty(::LinearMap)\nvertices_list(::LinearMap{Real})Inherited from LazySet:norm\nradius\ndiameter"
},

{
    "location": "lib/operations.html#LazySets.ExponentialMap",
    "page": "Common Set Operations",
    "title": "LazySets.ExponentialMap",
    "category": "type",
    "text": "ExponentialMap{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the action of an exponential map on a convex set.\n\nFields\n\nspmexp – sparse matrix exponential\nX      – convex set\n\nExamples\n\nThe ExponentialMap type is overloaded to the usual times * operator when the linear map is a lazy matrix exponential. For instance,\n\njulia> A = sprandn(100, 100, 0.1);\n\njulia> E = SparseMatrixExp(A);\n\njulia> B = BallInf(zeros(100), 1.);\n\njulia> M = E * B; # represents the image set: exp(A) * B\n\njulia> M isa ExponentialMap\ntrue\n\njulia> dim(M)\n100\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{ExponentialMap}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(em::ExponentialMap)::Int\n\nReturn the dimension of an exponential map.\n\nInput\n\nem – an ExponentialMap\n\nOutput\n\nThe ambient dimension of the exponential map.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},ExponentialMap{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, em::ExponentialMap{N}) where {N<:Real}\n\nReturn the support vector of the exponential map.\n\nInput\n\nd  – direction\nem – exponential map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf E = exp(M)S, where M is a matrix and S is a convex set, it follows that σ(d E) = exp(M)σ(exp(M)^T d S) for any direction d.\n\nWe allow sparse direction vectors, but will convert them to dense vectors to be able to use expmv.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Real,1},ExponentialMap{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "method",
    "text": "∈(x::AbstractVector{N}, em::ExponentialMap{<:LazySet{N}})::Bool where {N<:Real}\n\nCheck whether a given point is contained in an exponential map of a convex set.\n\nInput\n\nx  – point/vector\nem – exponential map of a convex set\n\nOutput\n\ntrue iff x  em.\n\nAlgorithm\n\nThis implementation exploits that x  exp(M)S iff exp(-M)x  S. This follows from exp(-M)exp(M) = I for any M.\n\nExamples\n\njulia> using Compat.SparseArrays: SparseMatrixCSC;\n\njulia> em = ExponentialMap(SparseMatrixExp(SparseMatrixCSC([2.0 0.0; 0.0 1.0])),\n                           BallInf([1., 1.], 1.));\n\njulia> ∈([-1.0, 1.0], em)\nfalse\njulia> ∈([1.0, 1.0], em)\ntrue\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{ExponentialMap}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(em::ExponentialMap)::Bool\n\nReturn if an exponential map is empty or not.\n\nInput\n\nem – exponential map\n\nOutput\n\ntrue iff the wrapped set is empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.vertices_list-Tuple{ExponentialMap{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.vertices_list",
    "category": "method",
    "text": "vertices_list(em::ExponentialMap{N})::Vector{Vector{N}} where N<:Real\n\nReturn the list of vertices of a (polytopic) exponential map.\n\nInput\n\nem – exponential map\n\nOutput\n\nA list of vertices.\n\nAlgorithm\n\nWe assume that the underlying set X is polytopic. Then the result is just the exponential map applied to the vertices of X.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.ExponentialProjectionMap",
    "page": "Common Set Operations",
    "title": "LazySets.ExponentialProjectionMap",
    "category": "type",
    "text": "ExponentialProjectionMap{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the application of a projection of a sparse matrix exponential to a convex set.\n\nFields\n\nspmexp – projection of a sparse matrix exponential\nX      – convex set\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{ExponentialProjectionMap}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "method",
    "text": "dim(eprojmap::ExponentialProjectionMap)::Int\n\nReturn the dimension of a projection of an exponential map.\n\nInput\n\neprojmap – projection of an exponential map\n\nOutput\n\nThe ambient dimension of the projection of an exponential map.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Real,1},ExponentialProjectionMap{Real,S} where S<:LazySet{Real}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N},\n  eprojmap::ExponentialProjectionMap{N}) where {N<:Real}\n\nReturn the support vector of a projection of an exponential map.\n\nInput\n\nd        – direction\neprojmap – projection of an exponential map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf S = (LMR)X, where L and R are matrices, M is a matrix exponential, and X is a set, it follows that σ(d S) = LMRσ(R^TM^TL^Td X) for any direction d.\n\nWe allow sparse direction vectors, but will convert them to dense vectors to be able to use expmv.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{ExponentialProjectionMap}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(eprojmap::ExponentialProjectionMap)::Bool\n\nReturn if an exponential projection map is empty or not.\n\nInput\n\neprojmap – exponential projection map\n\nOutput\n\ntrue iff the wrapped set is empty.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.SparseMatrixExp",
    "page": "Common Set Operations",
    "title": "LazySets.SparseMatrixExp",
    "category": "type",
    "text": "SparseMatrixExp{N}\n\nType that represents the matrix exponential, exp(M), of a sparse matrix.\n\nFields\n\nM – sparse matrix\n\nExamples\n\nTake for exammple a random sparse matrix:\n\njulia> A = sprandn(100, 100, 0.1);\n\njulia> E = SparseMatrixExp(A);\n\njulia> size(E)\n(100, 100)\n\nNow, E is a lazy representation of exp(A). To compute with E, use get_row and get_column (or get_rows and get_columns; they return row and column vectors (or matrices). For example:\n\njulia> get_row(E, 10); # compute E[10, :]\n\njulia> get_column(E, 10); # compute E[:, 10]\n\njulia> get_rows(E, [10]); # same as get_row(E, 10) but a 1x100 matrix is returned\n\njulia> get_columns(E, [10]); # same as get_column(E, 10) but a 100x1 matrix is returned\n\nNotes\n\nThis type is provided for use with very large and very sparse matrices. The evaluation of the exponential matrix action over vectors relies on the Expokit package.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{SparseMatrixExp,LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(spmexp::SparseMatrixExp, X::LazySet)::ExponentialMap\n\nReturn the exponential map of a convex set from a sparse matrix exponential.\n\nInput\n\nspmexp – sparse matrix exponential\nX      – convex set\n\nOutput\n\nThe exponential map of the convex set.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.get_row-Tuple{SparseMatrixExp,Int64}",
    "page": "Common Set Operations",
    "title": "LazySets.get_row",
    "category": "method",
    "text": "get_row(spmexp::SparseMatrixExp{N}, i::Int) where {N}\n\nReturn a single row of a sparse matrix exponential.\n\nInput\n\nspmexp – sparse matrix exponential\ni      – row index\n\nOutput\n\nA row vector corresponding to the ith row of the matrix exponential.\n\nNotes\n\nThis function uses Julia\'s transpose function to create the result. The result is of type Transpose; in Julia versions older than v0.7, the result was of type RowVector.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.ProjectionSparseMatrixExp",
    "page": "Common Set Operations",
    "title": "LazySets.ProjectionSparseMatrixExp",
    "category": "type",
    "text": "ProjectionSparseMatrixExp{N<:Real}\n\nType that represents the projection of a sparse matrix exponential, i.e., Lexp(M)R for a given sparse matrix M.\n\nFields\n\nL – left multiplication matrix\nE – sparse matrix exponential\nR – right multiplication matrix\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{ProjectionSparseMatrixExp,LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "method",
    "text": "    *(projspmexp::ProjectionSparseMatrixExp,\n      X::LazySet)::ExponentialProjectionMap\n\nReturn the application of a projection of a sparse matrix exponential to a convex set.\n\nInput\n\nprojspmexp – projection of a sparse matrix exponential\nX          – convex set\n\nOutput\n\nThe application of the projection of a sparse matrix exponential to the convex set.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Exponential-Map-1",
    "page": "Common Set Operations",
    "title": "Exponential Map",
    "category": "section",
    "text": "ExponentialMap\ndim(::ExponentialMap)\nσ(::AbstractVector{Real}, ::ExponentialMap{Real})\n∈(::AbstractVector{Real}, ::ExponentialMap{Real})\nisempty(::ExponentialMap)\nvertices_list(::ExponentialMap{Real})Inherited from LazySet:norm\nradius\ndiameter\nan_elementExponentialProjectionMap\ndim(::ExponentialProjectionMap)\nσ(::AbstractVector{Real}, ::ExponentialProjectionMap{Real})\nisempty(::ExponentialProjectionMap)Inherited from LazySet:norm\nradius\ndiameter\nan_elementSparseMatrixExp\n*(::SparseMatrixExp, ::LazySet)\nget_row(::SparseMatrixExp, ::Int)ProjectionSparseMatrixExp\n*(::ProjectionSparseMatrixExp, ::LazySet)"
},

{
    "location": "lib/operations.html#LazySets.SymmetricIntervalHull",
    "page": "Common Set Operations",
    "title": "LazySets.SymmetricIntervalHull",
    "category": "type",
    "text": "SymmetricIntervalHull{N<:Real, S<:LazySet{N}} <: AbstractHyperrectangle{N}\n\nType that represents the symmetric interval hull of a convex set.\n\nFields\n\nX     – convex set\ncache – partial storage of already computed bounds, organized as mapping   from dimension to tuples (bound, valid), where valid is a flag   indicating if the bound entry has been computed\n\nNotes\n\nThe symmetric interval hull can be computed with 2n support vector queries of unit vectors, where n is the dimension of the wrapped set (i.e., two queries per dimension). When asking for the support vector for a direction d, one needs 2k such queries, where k is the number of non-zero entries in d.\n\nHowever, if one asks for many support vectors in a loop, the number of computations may exceed 2n. To be most efficient in such cases, this type stores the intermediately computed bounds in the cache field.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Union{Tuple{N}, Tuple{AbstractArray{N,1},SymmetricIntervalHull{N,S} where S<:LazySet{N}}} where N<:Real",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "method",
    "text": "σ(d::AbstractVector{N}, sih::SymmetricIntervalHull{N}) where {N<:Real}\n\nReturn the support vector of a symmetric interval hull of a convex set in a given direction.\n\nInput\n\nd   – direction\nsih – symmetric interval hull of a convex set\n\nOutput\n\nThe support vector of the symmetric interval hull of a convex set in the given direction. If the direction has norm zero, the origin is returned.\n\nAlgorithm\n\nFor each non-zero entry in d we need to either look up the bound (if it has been computed before) or compute it, in which case we store it for future queries. One such computation just asks for the support vector of the underlying set for both the positive and negative unit vector in the respective dimension.\n\n\n\n\n\n"
},

{
    "location": "lib/operations.html#Symmetric-Interval-Hull-1",
    "page": "Common Set Operations",
    "title": "Symmetric Interval Hull",
    "category": "section",
    "text": "SymmetricIntervalHull\nσ(::AbstractVector{N}, ::SymmetricIntervalHull{N}) where {N<:Real}Inherited from LazySet:diameterInherited from AbstractPolytope:singleton_list\nlinear_mapInherited from AbstractCentrallySymmetricPolytope:dim\nisempty\nan_elementInherited from AbstractHyperrectangle:∈\nnorm\nradius\nvertices_list\nhigh\nlow"
},

{
    "location": "lib/conversion.html#",
    "page": "Conversion between set representations",
    "title": "Conversion between set representations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{#s269} where #s269<:AbstractHPolygon,VPolygon}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(T::Type{<:AbstractHPolygon}, P::VPolygon)\n\nConverts a polygon in vertex representation to a polygon in constraint representation.\n\nInput\n\nHPOLYGON – type used for dispatch\nP        – polygon in vertex representation\n\nOutput\n\nA polygon in constraint representation.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{Hyperrectangle},LazySets.Interval}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{Hyperrectangle}, x::Interval{N, IN}) where {N, IN <: AbstractInterval{N}}\n\nConverts a unidimensional interval into a hyperrectangular set.\n\nInput\n\nAbstractHyperrectangle\nx – interval\n\nOutput\n\nA hyperrectangle.\n\nExamples\n\njulia> convert(Hyperrectangle, Interval(0.0, 1.0))\nHyperrectangle{Float64}([0.5], [0.5])\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolygon},AbstractHyperrectangle}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPOLYGON}, H::AbstractHyperrectangle{N}) where {N, HPOLYGON<:AbstractHPolygon}\n\nConverts a hyperrectangular set to a polygon in constraint representation.\n\nInput\n\nHPOLYGON  – type used for dispatch\nH         – hyperrectangular set\n\nOutput\n\nA polygon in constraint representation.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolygon},HPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPOLYGON}, P::HPolytope) where {HPOLYGON<:AbstractHPolygon}\n\nConvert from 2D polytope in H-representation to polygon in H-representation.\n\nInput\n\ntype – target type\nP    – source polytope (must be 2D)\n\nOutput\n\nThe 2D polytope represented as polygon.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolygonOpt},HPolygon}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPOLYGON1},\n        P::HPOLYGON2) where {HPOLYGON1<:Union{HPolygon, HPolygonOpt},\n                             HPOLYGON2<:AbstractHPolygon}\n\nConvert between polygon types in H-representation.\n\nInput\n\ntype – target type\nP    – source polygon\n\nOutput\n\nThe polygon represented as the target type.\n\nNotes\n\nWe need the Union type for HPOLYGON1 because the target type must be concrete.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolytope},AbstractHPolygon}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPolytope}, P::AbstractHPolygon)\n\nConvert from polygon in H-representation to polytope in H-representation.\n\nInput\n\ntype – target type\nP    – source polygon\n\nOutput\n\nThe polygon represented as 2D polytope.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolytope},AbstractHyperrectangle}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPolytope}, P::AbstractPolytope)\n\nConvert polytopic set to polytope in H-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe given polytope represented as a polytope in constraint representation.\n\nAlgorithm\n\nP is first converted to a polytope in V-representation. Then, the conversion method to a polytope in H-representation is invoked. This conversion may require the Polyhedra library.\n\n\n\n\n\nconvert(::Type{HPolytope}, H::AbstractHyperrectangle{N}) where {N}\n\nConverts a hyperrectangular set to a polytope in constraint representation.\n\nInput\n\nHPolytope – type used for dispatch\nH         – hyperrectangular set\n\nOutput\n\nA polytope in constraint representation.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolytope},AbstractPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPolytope}, P::AbstractPolytope)\n\nConvert polytopic set to polytope in H-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe given polytope represented as a polytope in constraint representation.\n\nAlgorithm\n\nP is first converted to a polytope in V-representation. Then, the conversion method to a polytope in H-representation is invoked. This conversion may require the Polyhedra library.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{HPolytope},VPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{HPolytope}, P::VPolytope)\n\nConvert from polytope in V-representation to polytope in H-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe polytope in the dual representation.\n\nAlgorithm\n\nThe tohrep function is invoked. It requires the Polyhedra package.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{VPolygon},AbstractHPolygon}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{VPolygon}, P::AbstractHPolygon)\n\nConverts a polygon in constraint representation to a polygon in vertex representation.\n\nInput\n\nVPolygon – type used for dispatch\nP        – polygon in constraint representation\n\nOutput\n\nA polygon in vertex representation.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{VPolygon},AbstractPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{VPolygon}, P::AbstractPolytope)\n\nConvert polytopic set to polygon in V-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe 2D polytope represented as a polygon.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{VPolytope},AbstractPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{VPolytope}, P::AbstractPolytope)\n\nConvert polytopic type to polytope in V-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe set P represented as a VPolytope.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{VPolytope},HPolytope}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{VPolytope}, P::HPolytope)\n\nConvert from polytope in H-representation to polytope in V-representation.\n\nInput\n\ntype – target type\nP    – source polytope\n\nOutput\n\nThe polytope in the dual representation.\n\nAlgorithm\n\nThe tovrep function is invoked. It requires the Polyhedra package.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Base.convert-Tuple{Type{Zonotope},AbstractHyperrectangle}",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "method",
    "text": "convert(::Type{Zonotope}, H::AbstractHyperrectangle{N}) where {N}\n\nConverts a hyperrectangular set to a zonotope.\n\nInput\n\nZonotope\nH – hyperrectangular set\n\nOutput\n\nA zonotope.\n\n\n\n\n\n"
},

{
    "location": "lib/conversion.html#Conversion-between-set-representations-1",
    "page": "Conversion between set representations",
    "title": "Conversion between set representations",
    "category": "section",
    "text": "This section of the manual lists the conversion functions between set representations.Pages = [\"conversion.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nendconvert(T::Type{<:AbstractHPolygon}, P::VPolygon)\nconvert(::Type{Hyperrectangle}, ::Interval)\nconvert(::Type{HPolygon}, ::AbstractHyperrectangle)\nconvert(::Type{HPolygon}, ::HPolytope)\nconvert(::Type{HPolygonOpt}, ::HPolygon)\nconvert(::Type{HPolytope}, P::AbstractHPolygon)\nconvert(::Type{HPolytope}, ::AbstractHyperrectangle)\nconvert(::Type{HPolytope}, P::AbstractPolytope)\nconvert(::Type{HPolytope}, P::VPolytope)\nconvert(::Type{VPolygon}, P::AbstractHPolygon)\nconvert(::Type{VPolygon}, P::AbstractPolytope)\nconvert(::Type{VPolytope}, P::AbstractPolytope)\nconvert(::Type{VPolytope}, P::HPolytope)\nconvert(::Type{Zonotope}, ::AbstractHyperrectangle)"
},

{
    "location": "lib/binary_functions.html#",
    "page": "Binary Functions on Sets",
    "title": "Binary Functions on Sets",
    "category": "page",
    "text": ""
},

{
    "location": "lib/binary_functions.html#Binary-Functions-on-Sets-1",
    "page": "Binary Functions on Sets",
    "title": "Binary Functions on Sets",
    "category": "section",
    "text": "This section of the manual describes the binary functions for set types.Pages = [\"binary_functions.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{LazySet{N},AbstractHyperrectangle{N}}, Tuple{LazySet{N},AbstractHyperrectangle{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractPolytope{N},LazySet{N}}, Tuple{AbstractPolytope{N},LazySet{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractPolytope{N},AbstractHyperrectangle}, Tuple{AbstractPolytope{N},AbstractHyperrectangle,Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(P::AbstractPolytope{N}, H::AbstractHyperrectangle, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractHyperrectangle{N},AbstractHyperrectangle{N}}, Tuple{AbstractHyperrectangle{N},AbstractHyperrectangle{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(H1::AbstractHyperrectangle{N},\n  H2::AbstractHyperrectangle{N},\n  [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given hyperrectangular set is contained in another hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nH1 – inner hyperrectangular set\nH2 – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2\nIf witness option is activated:\n(true, []) iff H1  H2\n(false, v) iff H1 notsubseteq H2 and v  H1 setminus H2\n\nAlgorithm\n\nH1  H2 iff c_1 + r_1  c_2 + r_2  c_1 - r_1  c_2 - r_2 iff r_1 - r_2  c_1 - c_2  -(r_1 - r_2), where  is taken component-wise.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractSingleton{N},LazySet{N}}, Tuple{AbstractSingleton{N},LazySet{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(S::AbstractSingleton{N}, set::LazySet{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nS   – inner set with a single value\nset – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  textset\nIf witness option is activated:\n(true, []) iff S  textset\n(false, v) iff S notsubseteq textset and v  S setminus textset\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractSingleton{N},AbstractHyperrectangle{N}}, Tuple{AbstractSingleton{N},AbstractHyperrectangle{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(S::AbstractSingleton{N},\n  H::AbstractHyperrectangle{N},\n  [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nS – inner set with a single value\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{AbstractSingleton{N},AbstractSingleton{N}}, Tuple{AbstractSingleton{N},AbstractSingleton{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(S1::AbstractSingleton{N},\n  S2::AbstractSingleton{N},\n  [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in another set with a single value, and if not, optionally compute a witness.\n\nInput\n\nS1 – inner set with a single value\nS2 – outer set with a single value\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S1  S2 iff S1 == S2\nIf witness option is activated:\n(true, []) iff S1  S2\n(false, v) iff S1 notsubseteq S2 and v  S1 setminus S2\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{Ball2{AbstractFloat},Ball2{AbstractFloat}}, Tuple{Ball2{AbstractFloat},Ball2{AbstractFloat},Bool}} where N<:AbstractFloat",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(B1::Ball2{N}, B2::Ball2{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a ball in the 2-norm is contained in another ball in the 2-norm, and if not, optionally compute a witness.\n\nInput\n\nB1 – inner ball in the 2-norm\nB2 – outer ball in the 2-norm\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B1  B2\nIf witness option is activated:\n(true, []) iff B1  B2\n(false, v) iff B1 notsubseteq B2 and v  B1 setminus B2\n\nAlgorithm\n\nB1  B2 iff  c_1 - c_2 _2 + r_1  r_2\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{Union{Ball2{N}, Ballp{N}},AbstractSingleton{N}}, Tuple{Union{Ball2{N}, Ballp{N}},AbstractSingleton{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(B::Union{Ball2{N}, Ballp{N}},\n  S::AbstractSingleton{N},\n  [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a ball in the 2-norm or p-norm is contained in a set with a single value, and if not, optionally compute a witness.\n\nInput\n\nB – inner ball in the 2-norm or p-norm\nS – outer set with a single value\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B  S\nIf witness option is activated:\n(true, []) iff B  S\n(false, v) iff B notsubseteq S and v  B setminus S\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{LineSegment{N},LazySet{N}}, Tuple{LineSegment{N},LazySet{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(L::LineSegment{N}, S::LazySet{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a line segment is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nL – inner line segment\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff L  S\nIf witness option is activated:\n(true, []) iff L  S\n(false, v) iff L notsubseteq S and v  L setminus S\n\nAlgorithm\n\nSince S is convex, L  S iff p  S and q  S, where p q are the end points of L.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Union{Tuple{N}, Tuple{LineSegment{N},Hyperrectangle{N}}, Tuple{LineSegment{N},Hyperrectangle{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\n\n\n⊆(P::AbstractPolytope{N}, H::AbstractHyperrectangle, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\n\n\n⊆(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\n\n\n⊆(L::LineSegment{N}, S::LazySet{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a line segment is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nL – inner line segment\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff L  S\nIf witness option is activated:\n(true, []) iff L  S\n(false, v) iff L notsubseteq S and v  L setminus S\n\nAlgorithm\n\nSince S is convex, L  S iff p  S and q  S, where p q are the end points of L.\n\n\n\n\n\n⊆(L::LineSegment{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a line segment is contained in a hyperrectangular set, and if not, optionally compute a witness.\n\nInput\n\nL – inner line segment\nH – outer hyperrectangular set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff L  H\nIf witness option is activated:\n(true, []) iff L  H\n(false, v) iff L notsubseteq H and v  L setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, L  H iff p  H and q  H, where p q are the end points of L.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Base.:⊆-Tuple{LazySets.Interval,LazySets.Interval}",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "method",
    "text": "⊆(x::Interval, y::Interval)\n\nCheck whether an interval is contained in another interval.\n\nInput\n\nx – interval\ny – interval\n\nOutput\n\ntrue iff x  y.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Subset-check-1",
    "page": "Binary Functions on Sets",
    "title": "Subset check",
    "category": "section",
    "text": "⊆(::LazySet{N}, ::AbstractHyperrectangle{N}, ::Bool=false) where {N<:Real}\n⊆(::AbstractPolytope{N}, ::LazySet{N}, ::Bool=false) where {N<:Real}\n⊆(::AbstractPolytope{N}, ::AbstractHyperrectangle, ::Bool=false) where {N<:Real}\n⊆(::AbstractHyperrectangle{N}, ::AbstractHyperrectangle{N}, ::Bool=false) where {N<:Real}\n⊆(::AbstractSingleton{N}, ::LazySet{N}, ::Bool=false) where {N<:Real}\n⊆(::AbstractSingleton{N}, ::AbstractHyperrectangle{N}, ::Bool=false) where {N<:Real}\n⊆(::AbstractSingleton{N}, ::AbstractSingleton{N}, ::Bool=false) where {N<:Real}\n⊆(::Ball2{AbstractFloat}, ::Ball2{AbstractFloat}, ::Bool=false) where {N<:AbstractFloat}\n	⊆(::Union{Ball2{N}, Ballp{N}}, ::AbstractSingleton{N}, ::Bool=false) where {N<:Real}\n⊆(::LineSegment{N}, ::LazySet{N}, ::Bool=false) where {N<:Real}\n⊆(::LineSegment{N}, ::Hyperrectangle{N}, ::Bool=false) where {N<:Real}\n⊆(::Interval, ::Interval)"
},

{
    "location": "lib/binary_functions.html#LazySets.isdisjoint",
    "page": "Binary Functions on Sets",
    "title": "LazySets.isdisjoint",
    "category": "function",
    "text": "isdisjoint(X, Y)\n\nAn alternative name for is_intersection_empty(X, Y).\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LazySet{N},LazySet{N}}, Tuple{LazySet{N},LazySet{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      Y::LazySet{N},\n                      witness::Bool=false\n                      )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two sets do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – set\nY       – another set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff X  Y = \nIf witness option is activated:\n(true, []) iff X  Y = \n(false, v) iff X  Y   and v  X  Y\n\nAlgorithm\n\nThis is a fallback implementation that computes the concrete intersection, intersection, of the given sets.\n\nA witness is constructed using the an_element implementation of the result.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{AbstractHyperrectangle{N},AbstractHyperrectangle{N}}, Tuple{AbstractHyperrectangle{N},AbstractHyperrectangle{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(H1::AbstractHyperrectangle{N},\n                      H2::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two hyperrectangles do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2 = \nIf witness option is activated:\n(true, []) iff H1  H2 = \n(false, v) iff H1  H2   and v  H1  H2\n\nAlgorithm\n\nH1  H2   iff c_2 - c_1  r_1 + r_2, where  is taken component-wise.\n\nA witness is computed by starting in one center and moving toward the other center for as long as the minimum of the radius and the center distance. In other words, the witness is the point in H1 that is closest to the center of H2.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LazySet{N},AbstractSingleton{N}}, Tuple{LazySet{N},AbstractSingleton{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether a convex set and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – convex set\nS       – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  X = \nIf witness option is activated:\n(true, []) iff S  X = \n(false, v) iff S  X   and v = element(S)  S  X\n\nAlgorithm\n\nS  X =  iff element(S)  X.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{AbstractHyperrectangle{N},AbstractSingleton{N}}, Tuple{AbstractHyperrectangle{N},AbstractSingleton{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(H::AbstractHyperrectangle{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether a hyperrectangle and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH – hyperrectangle\nS – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  S = \nIf witness option is activated:\n(true, []) iff H  S = \n(false, v) iff H  S   and v = element(S)  H  S\n\nAlgorithm\n\nH  S =  iff element(S)  H.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{AbstractSingleton{N},AbstractSingleton{N}}, Tuple{AbstractSingleton{N},AbstractSingleton{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(S1::AbstractSingleton{N},\n                      S2::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two singletons do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS1 – first singleton\nS2 – second singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S1  S2 = \nIf witness option is activated:\n(true, []) iff S1  S2 = \n(false, v) iff S1  S2   and v = element(S1)  S1  S2\n\nAlgorithm\n\nS1  S2 =  iff S1  S2.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{Zonotope{N},Hyperplane{N}}, Tuple{Zonotope{N},Hyperplane{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(Z::Zonotope{N}, H::Hyperplane{N}, witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether a zonotope and a hyperplane do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nZ – zonotope\nH – hyperplane\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff Z  H = \nIf witness option is activated:\n(true, []) iff Z  H = \n(false, v) iff Z  H   and v  Z  H\n\nAlgorithm\n\nZ  H =  iff (b - ac)  left  _i=1^p ag_i right, where a, b are the hyperplane coefficients, c is the zonotope\'s center, and g_i are the zonotope\'s generators.\n\nFor witness production we fall back to a less efficient implementation for general sets as the first argument.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{Ball2{N},Ball2{N}}, Tuple{Ball2{N},Ball2{N},Bool}} where N<:AbstractFloat",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      Y::LazySet{N},\n                      witness::Bool=false\n                      )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two sets do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – set\nY       – another set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff X  Y = \nIf witness option is activated:\n(true, []) iff X  Y = \n(false, v) iff X  Y   and v  X  Y\n\nAlgorithm\n\nThis is a fallback implementation that computes the concrete intersection, intersection, of the given sets.\n\nA witness is constructed using the an_element implementation of the result.\n\n\n\n\n\nis_intersection_empty(B1::Ball2{N},\n                      B2::Ball2{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two balls in the 2-norm do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nB1 – first ball in the 2-norm\nB2 – second ball in the 2-norm\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B1  B2 = \nIf witness option is activated:\n(true, []) iff B1  B2 = \n(false, v) iff B1  B2   and v  B1  B2\n\nAlgorithm\n\nB1  B2 =  iff  c_2 - c_1 _2  r_1 + r_2.\n\nA witness is computed depending on the smaller/bigger ball (to break ties, choose B1 for the smaller ball) as follows.\n\nIf the smaller ball\'s center is contained in the bigger ball, we return it.\nOtherwise start in the smaller ball\'s center and move toward the other center until hitting the smaller ball\'s border. In other words, the witness is the point in the smaller ball that is closest to the center of the bigger ball.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LineSegment{N},LineSegment{N}}, Tuple{LineSegment{N},LineSegment{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(ls1::LineSegment{N},\n                      ls2::LineSegment{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two line segments do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nls1 – first line segment\nls2 – second line segment\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff ls1  ls2 = \nIf witness option is activated:\n(true, []) iff ls1  ls2 = \n(false, v) iff ls1  ls2   and v  ls1  ls2\n\nAlgorithm\n\nThe algorithm is inspired from here, which again is the special 2D case of a 3D algorithm by Ronald Goldman\'s article on the Intersection of two lines in three-space in Graphics Gems, Andrew S. (ed.), 1990.\n\nWe first check if the two line segments are parallel, and if so, if they are collinear. In the latter case, we check containment of any of the end points in the other line segment. Otherwise the lines are not parallel, so we can solve an equation of the intersection point, if it exists.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LazySet{N},Union{Hyperplane{N}, Line{N,V} where V<:AbstractArray{N,1}}}, Tuple{LazySet{N},Union{Hyperplane{N}, Line{N,V} where V<:AbstractArray{N,1}},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      hp::Union{Hyperplane{N}, Line{N}},\n                      [witness]::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether a compact set an a hyperplane do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – compact set\nhp      – hyperplane\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff X  hp = \nIf witness option is activated:\n(true, []) iff X  hp = \n(false, v) iff X  hp   and v  X  hp\n\nNotes\n\nWe assume that X is compact. Otherwise, the support vector queries may fail.\n\nAlgorithm\n\nA compact convex set intersects with a hyperplane iff the support function in the negative resp. positive direction of the hyperplane\'s normal vector a is to the left resp. right of the hyperplane\'s constraint b:\n\n-ρ(-a)  b  ρ(a)\n\nFor witness generation, we compute a line connecting the support vectors to the left and right, and then take the intersection of the line with the hyperplane. We follow this algorithm for the line-hyperplane intersection.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LazySet{N},HalfSpace{N}}, Tuple{LazySet{N},HalfSpace{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      hs::HalfSpace{N},\n                      [witness]::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether a compact set an a half-space do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – compact set\nhs      – half-space\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff X  hs = \nIf witness option is activated:\n(true, []) iff X  hs = \n(false, v) iff X  hs   and v  X  hs\n\nNotes\n\nWe assume that X is compact. Otherwise, the support vector queries may fail.\n\nAlgorithm\n\nA compact convex set intersects with a half-space iff the support vector in the negative direction of the half-space\'s normal vector a is contained in the half-space: σ(-a)  hs. The support vector is thus also a witness.\n\nOptional keyword arguments can be passed to the ρ function. In particular, if X is a lazy intersection, options can be passed to the line search algorithm.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{HalfSpace{N},HalfSpace{N}}, Tuple{HalfSpace{N},HalfSpace{N},Bool}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(hs1::HalfSpace{N},\n                      hs2::HalfSpace{N},\n                      [witness]::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two half-spaces do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nhs1     – half-space\nhs2     – half-space\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff hs1  hs2 = \nIf witness option is activated:\n(true, []) iff hs1  hs2 = \n(false, v) iff hs1  hs2   and v  hs1  hs2\n\nAlgorithm\n\nTwo half-spaces do not intersect if and only if their normal vectors point in the opposite direction and there is a gap between the two defining hyperplanes.\n\nThe latter can be checked as follows: Let hs_1  a_1x = b_1 and hs2  a_2x = b_2. Then we already know that a_2 = -ka_1 for some positive scaling factor k. Let x_1 be a point on the defining hyperplane of hs_1. We construct a line segment from x_1 to the point x_2 on the defining hyperplane of hs_2 by shooting a ray from x_1 with direction a_1. Thus we look for a factor s such that (x_1 + sa_1)a_2 = b_2. This gives us s = (b_2 - x_1a_2)  (-k a_1a_1). The gap exists if and only if s is positive.\n\nIf the normal vectors do not point in opposite directions, then the defining hyperplanes intersect and we can produce a witness as follows. All points x in this intersection satisfy a_1x = b_1 and a_2x = b_2. Thus we have (a_1 + a_2)x = b_1+b_2. We now find a dimension where a_1 + a_2 is non-zero, say, i. Then the result is a vector with one non-zero entry in dimension i, defined as 0  0 (b_1 + b_2)(a_1i + a_2i) 0  0. Such a dimension i always exists.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Union{Tuple{N}, Tuple{LazySet{N},Union{AbstractHPolygon{N}, HPolytope{N}}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "method",
    "text": "is_intersection_empty(X::LazySet{N},\n                      Y::LazySet{N},\n                      witness::Bool=false\n                      )::Union{Bool, Tuple{Bool, Vector{N}}} where N<:Real\n\nCheck whether two sets do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nX       – set\nY       – another set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff X  Y = \nIf witness option is activated:\n(true, []) iff X  Y = \n(false, v) iff X  Y   and v  X  Y\n\nAlgorithm\n\nThis is a fallback implementation that computes the concrete intersection, intersection, of the given sets.\n\nA witness is constructed using the an_element implementation of the result.\n\n\n\n\n\nis_intersection_empty(X::LazySet{N},\n                      P::Union{HPolyhedron{N}, HPolytope{N}, AbstractHPolygon{N}},\n                      witness::Bool=false\n                     )::Bool where N<:Real\n\nCheck whether a compact set and a polytope do not intersect.\n\nInput\n\nX  – compact set\nP  – polytope or polygon in constraint-representation\n\nOutput\n\ntrue iff X  P = .\n\nNotes\n\nWe assume that X is compact. Otherwise, the support vector queries may fail. Witness production is not supported.\n\nAlgorithm\n\nThe algorithm relies on the intersection check between the set X and each constraint in P. It costs m support vector evaluations of X, where m is the number of constraints in P.\n\nNote that this method can be used with any set P whose constraints are known.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Check-for-emptiness-of-intersection-1",
    "page": "Binary Functions on Sets",
    "title": "Check for emptiness of intersection",
    "category": "section",
    "text": "isdisjoint\nis_intersection_empty(::LazySet{N}, ::LazySet{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::AbstractHyperrectangle{N}, ::AbstractHyperrectangle{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::LazySet{N}, ::AbstractSingleton{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::AbstractHyperrectangle{N}, ::AbstractSingleton{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::AbstractSingleton{N}, ::AbstractSingleton{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::Zonotope{N}, ::Hyperplane{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::Ball2{N}, ::Ball2{N}, ::Bool=false) where {N<:AbstractFloat}\nis_intersection_empty(::LineSegment{N}, ::LineSegment{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::LazySet{N}, ::Union{Hyperplane{N}, Line{N}}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::LazySet{N}, ::HalfSpace{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::HalfSpace{N}, ::HalfSpace{N}, ::Bool=false) where {N<:Real}\nis_intersection_empty(::LazySet{N}, ::Union{HPolytope{N}, AbstractHPolygon{N}}) where {N<:Real}"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{Line{N,V} where V<:AbstractArray{N,1},Line{N,V} where V<:AbstractArray{N,1}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(L1::Line{N}, L2::Line{N}\n            )::Union{Singleton{N}, Line{N}, EmptySet{N}} where {N<:Real}\n\nReturn the intersection of two 2D lines.\n\nInput\n\nL1 – first line\nL2 – second line\n\nOutput\n\nIf the lines are identical, the result is the first line. If the lines are parallel and not identical, the result is the empty set. Otherwise the result is the only intersection point.\n\nExamples\n\nThe line y = -x + 1 intersected with the line y = x:\n\njulia> intersection(Line([-1., 1.], 0.), Line([1., 1.], 1.))\nSingleton{Float64}([0.5, 0.5])\njulia> intersection(Line([1., 1.], 1.), Line([1., 1.], 1.))\nLine{Float64,Array{Float64,1}}([1.0, 1.0], 1.0)\n\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{Hyperrectangle{N},Hyperrectangle{N}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(H1::AbstractHyperrectangle{N},\n             H2::AbstractHyperrectangle{N}\n            )::Union{<:Hyperrectangle{N}, EmptySet{N}} where {N<:Real}\n\nReturn the intersection of two hyperrectangles.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\n\nOutput\n\nIf the hyperrectangles do not intersect, the result is the empty set. Otherwise the result is the hyperrectangle that describes the intersection.\n\nAlgorithm\n\nIn each isolated direction i we compute the rightmost left border and the leftmost right border of the hyperrectangles. If these borders contradict, then the intersection is empty. Otherwise the result uses these borders in each dimension.\n\n\n\n\n\nintersection(P1::S1, P2::S2) where {S1<:AbstractPolytope{N},\n                                    S2<:AbstractPolytope{N}} where N\n\nCompute the intersection of two polytopic sets.\n\nInput\n\nP1 – polytope\nP2 – another polytope\n\nOutput\n\nThe polytope obtained by the intersection of P1 and P2. Usually the V-representation is used.\n\nNotes\n\nThis fallback implementation requires Polyhedra to evaluate the concrete intersection. Inputs that are not of type HPolytope or VPolytope are converted to an HPolytope through the constraints_list function.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{Interval{N,IN} where IN<:AbstractInterval{N},Interval{N,IN} where IN<:AbstractInterval{N}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(x::Interval{N},\n             y::Interval{N}\n             )::Union{Interval{N}, EmptySet{N}} where {N<:Real}\n\nReturn the intersection of two intervals.\n\nInput\n\nx – first interval\ny – second interval\n\nOutput\n\nIf the intervals do not intersect, the result is the empty set. Otherwise the result is the interval that describes the intersection.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{AbstractHPolygon{N},AbstractHPolygon{N}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(P1::AbstractHPolygon{N},\n             P2::AbstractHPolygon{N}\n            )::Union{HPolygon{N}, EmptySet{N}} where N<:Real\n\nReturn the intersection of two polygons in constraint representation.\n\nInput\n\nP1 – first polygon\nP2 – second polygon\n\nOutput\n\nIf the polygons do not intersect, the result is the empty set. Otherwise the result is the polygon that describes the intersection.\n\nAlgorithm\n\nWe just combine the constraints of both polygons. To obtain a linear-time algorithm, we interleave the constraints. If there are two constraints with the same normal vector, we choose the tighter one.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{HPolytope{N},HalfSpace{N}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(P::HPoly{N},\n             hs::HalfSpace{N};\n             backend=default_polyhedra_backend(P, N),\n             prunefunc=removehredundancy!) where N<:Real\n\nCompute the intersection of a polytope in H-representation and a half-space.\n\nInput\n\nP         – polytope\nhs        – half-space\nbackend   – (optional, default: default_polyhedra_backend(P, N)) the                polyhedral computations backend, see                Polyhedra\'s documentation                for further information\nprunefunc – (optional, default: removehredundancy!) function to                post-process the polytope after adding the additional                constraint\n\nOutput\n\nThe same polytope in H-representation with just one more constraint.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.intersection-Union{Tuple{N}, Tuple{HPolyhedron{N},AbstractPolytope{N}}} where N<:Real",
    "page": "Binary Functions on Sets",
    "title": "LazySets.intersection",
    "category": "method",
    "text": "intersection(P1::HPoly{N},\n             P2::AbstractPolytope{N};\n             backend=default_polyhedra_backend(P1, N),\n             prunefunc=removehredundancy!) where N\n\nCompute the intersection of a polyhedron and a polytope.\n\nInput\n\nP1        – polyhedron\nP2        – polytope\nbackend   – (optional, default: default_polyhedra_backend(P1, N)) the                polyhedral computations backend, see                Polyhedra\'s documentation                for further information\nprunefunc – (optional, default: removehredundancy!) function to                post-process the output of intersect\n\nOutput\n\nThe polytope in H-representation obtained by the intersection of P1 and P2.\n\n\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Intersection-of-two-sets-1",
    "page": "Binary Functions on Sets",
    "title": "Intersection of two sets",
    "category": "section",
    "text": "intersection(::Line{N}, ::Line{N}) where {N<:Real}\nintersection(::Hyperrectangle{N}, ::Hyperrectangle{N}) where {N<:Real}\nintersection(::Interval{N}, ::Interval{N}) where {N<:Real}\nintersection(::AbstractHPolygon{N}, ::AbstractHPolygon{N}) where {N<:Real}\nintersection(::HPolytope{N}, ::HalfSpace{N}) where {N<:Real}\nintersection(::HPolyhedron{N}, ::AbstractPolytope{N}) where {N<:Real}"
},

{
    "location": "lib/approximations.html#",
    "page": "Approximations",
    "title": "Approximations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/approximations.html#LazySets.Approximations",
    "page": "Approximations",
    "title": "LazySets.Approximations",
    "category": "module",
    "text": "Module Approximations.jl – polygonal approximation of convex sets through support vectors.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Approximations-1",
    "page": "Approximations",
    "title": "Approximations",
    "category": "section",
    "text": "This section of the manual describes the Cartesian decomposition algorithms and the approximation of high-dimensional convex sets using projections.Pages = [\"approximations.md\"]\nDepth = 3CurrentModule = LazySets.Approximations\nDocTestSetup = quote\n    using LazySets, LazySets.Approximations\nendApproximations"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.decompose",
    "page": "Approximations",
    "title": "LazySets.Approximations.decompose",
    "category": "function",
    "text": "decompose(S::LazySet{N};\n          [set_type]::Type{<:Union{HPolygon, Hyperrectangle, Interval}}=Hyperrectangle,\n          [ε]::Real=Inf,\n          [blocks]::AbstractVector{Int}=default_block_structure(S, set_type),\n          [block_types]::Dict{Type{<:LazySet}, AbstractVector{<:AbstractVector{Int}}}(),\n          [directions]::Union{Type{<:AbstractDirections}, Nothing}=nothing\n         )::CartesianProductArray where {N<:Real}\n\nDecompose a high-dimensional set into a Cartesian product of overapproximations of the projections over the specified subspaces.\n\nInput\n\nS           – set\nset_type    – (optional, default: Hyperrectangle) type of set approximation                  for each subspace\nε           – (optional, default: Inf) error bound for polytopic approximation\nblocks      – (optional, default: [2, …, 2] or [1, …, 1] if set_type is an interval)                  block structure - a vector with the size of each block\nblock_types – (optional, default: Interval for 1D and Hyperrectangle                  for mD blocks) a mapping from set types to blocks\ndirections  – (optional, default: nothing) template direction type, or                  nothing\n\nOutput\n\nA CartesianProductArray containing the low-dimensional approximated projections.\n\nAlgorithm\n\nFor each block a specific project method is called, dispatched on the set_type argument.\n\nNotes\n\nIf directions is different from nothing, the template directions are used together with blocks. Otherwise, if block_types is given, the options set_type and blocks are ignored.\n\nExamples\n\nThe decompose function supports different options, such as: supplying different dimensions for the decomposition, defining the target set of the decomposition, or specifying the degree of accuracy of the target decomposition. You can also choose to make the approximations in low dimensions using template directions. These options are exemplified below.\n\nDifferent dimensions\n\nBy default, decompose returns a Cartesian product of 2D Hyperrectangle sets. For example:\n\njulia> import LazySets.Approximations:decompose\n\njulia> S = Ball2(zeros(4), 1.);\n\njulia> array(decompose(S))\n2-element Array{LazySet{Float64},1}:\n Hyperrectangle{Float64}([0.0, 0.0], [1.0, 1.0])\n Hyperrectangle{Float64}([0.0, 0.0], [1.0, 1.0])\n\nOther block sizes can be specified using the blocks option, which refers to each block size of the partition:\n\njulia> array(decompose(S, blocks=[1, 3]))\n2-element Array{LazySet{Float64},1}:\n Hyperrectangle{Float64}([0.0], [1.0])\n Hyperrectangle{Float64}([0.0, 0.0, 0.0], [1.0, 1.0, 1.0])\n\njulia> array(decompose(S, blocks=[4]))\n1-element Array{LazySet{Float64},1}:\n Hyperrectangle{Float64}([0.0, 0.0, 0.0, 0.0], [1.0, 1.0, 1.0, 1.0])\n\nDifferent set types\n\nWe can also decompose using polygons in constraint representation, through the set_type optional argument:\n\njulia> all([ai isa HPolygon for ai in array(decompose(S, set_type=HPolygon))])\ntrue\n\nFor decomposition into 1D subspaces, we can use Interval:\n\njulia> all([ai isa Interval for ai in array(decompose(S, set_type=Interval))])\ntrue\n\nHowever, if you need to specify different set types for different blocks, the interface presented so far does not apply. In the paragraph Advanced different set types input we explain the input block_types, that can be used precisely for that purpose.\n\nRefining the decomposition I:  ε-close approximation\n\nThe ε option can be used to refine, that is obtain a more accurate decomposition in those blocks where HPolygon types are used, and it relies on the iterative refinement algorithm provided in the Approximations module.\n\nTo illustrate this, consider the unit 4D ball in the 2-norm. Using smaller ε implies a better precision, thus more constraints in each 2D decomposition:\n\njulia> S = Ball2(zeros(4), 1.);\n\njulia> d(ε, bi) = array(decompose(S, set_type=HPolygon, ε=ε))[bi]\nd (generic function with 1 method)\n\njulia> [length(constraints_list(d(ε, 1))) for ε in [Inf, 0.1, 0.01]]\n3-element Array{Int64,1}:\n  4\n  8\n 32\n\nRefining the decomposition II: template polyhedra\n\nAnother way to refine the decomposition is using template polyhedra. The idea is to specify a set of template directions, and on each block, compute the polytopic overapproximation obtained by evaluating the support function of the given input set over the template directions.\n\nFor example, octagonal 2D approximations of the ball S are obtained with:\n\njulia> B = decompose(S, directions=OctDirections);\n\njulia> length(B.array) == 2 && all(dim(bi) == 2 for bi in B.array)\ntrue\n\nSee template_directions.jl for the available template directions. Note that, in contrast to the polygonal ε-close approximation, this method can be applied for blocks of any size.\n\njulia> B = decompose(S, directions=OctDirections, blocks=[4]);\n\njulia> length(B.array) == 1 && dim(B.array[1]) == 4\ntrue\n\nAdvanced different set types input\n\nWe can define different set types for different blocks, using the optional block_types input argument. It is a dictionary where the keys correspond to set types, and the values correspond to the blocks, namely the initial and final block indices should be given.\n\nFor example:\n\njulia> S = Ball2(zeros(3), 1.);\n\njulia> array(decompose(S, block_types=Dict(Interval=>[1:1], Hyperrectangle=>[2:3])))\n2-element Array{LazySet{Float64},1}:\n Interval{Float64,IntervalArithmetic.Interval{Float64}}([-1, 1])\n Hyperrectangle{Float64}([0.0, 0.0], [1.0, 1.0])\n\nWe can additionally pass ε, which is automatically used for each HPolygon type block.\n\njulia> S = Ball2(zeros(8), 1.);\n\njulia> bt = Dict(Interval=>[1:1], Hyperrectangle=>[2:4], HPolygon=>[5:6, 7:8]);\n\njulia> [typeof(ai) for ai in array(decompose(S, block_types=bt, ε=0.01))]\n4-element Array{DataType,1}:\n Interval{Float64,IntervalArithmetic.Interval{Float64}}\n Hyperrectangle{Float64}\n HPolygon{Float64}\n HPolygon{Float64}\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.default_block_structure",
    "page": "Approximations",
    "title": "LazySets.Approximations.default_block_structure",
    "category": "function",
    "text": "default_block_structure(S::LazySet, set_type::Type{<:LazySet})::AbstractVector{Int}\n\nCompute the default block structure.\n\nInput\n\nS        – set\nset_type – target set type\n\nOutput\n\nA vector representing the block structure, such that:\n\nIf the target set_type is an interval, the default is blocks of size 1.\nOtherwise, the default is blocks of size 2. Depending on the dimension, the last block has size 1 or 2.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.project",
    "page": "Approximations",
    "title": "LazySets.Approximations.project",
    "category": "function",
    "text": "project(S::LazySet{N},\n        block::AbstractVector{Int},\n        set_type::Type{<:LazySet},\n        [n]::Int=dim(S),\n        [ε]::Real=Inf\n       )::LazySet{N} where {N<:Real}\n\nDefault implementation for projecting a high-dimensional set to a given set type with possible overapproximation.\n\nInput\n\nS – set\nblock – block structure - a vector with the dimensions of interest\nset_type – target set type\nn – (optional, default: dim(S)) ambient dimension of the set S\nε – (optional, default: Inf) ignored\n\nOutput\n\nA set of type set_type representing an overapproximation of the projection of S.\n\nAlgorithm\n\nProject the set S with M⋅S, where M is the identity matrix in the block coordinates and zero otherwise.\nOverapproximate the projected lazy set using overapproximate.\n\n\n\n\n\nproject(S::LazySet{N},\n        block::AbstractVector{Int},\n        set_type::Type{<:HPolygon},\n        [n]::Int=dim(S),\n        [ε]::Real=Inf\n       )::HPolygon where {N<:Real}\n\nProject a high-dimensional set to a two-dimensional polygon with a certified error bound.\n\nInput\n\nS – set\nblock – block structure - a vector with the dimensions of interest\nset_type – HPolygon - used for dispatch\nn – (optional, default: dim(S)) ambient dimension of the set S\nε – (optional, default: Inf) error bound for polytopic approximation\n\nOutput\n\nA HPolygon representing the epsilon-close approximation of the box approximation of the projection of S.\n\nNotes\n\nblock must have length 2.\n\nAlgorithm\n\nIf ε < Inf, the algorithm proceeds as follows:\n\nProject the set S with M⋅S, where M is the identity matrix in the block coordinates and zero otherwise.\nOverapproximate the set with the given error bound ε.\n\nIf ε == Inf, the algorithm uses a box approximation.\n\n\n\n\n\nproject(S::LazySet{N},\n        block::AbstractVector{Int},\n        set_type::Type{<:Hyperrectangle},\n        [n]::Int=dim(S),\n        [ε]::Real=Inf\n       )::Hyperrectangle where {N<:Real}\n\nProject a high-dimensional set to a low-dimensional hyperrectangle.\n\nInput\n\nS – set\nblock – block structure - a vector with the dimensions of interest\nset_type – Hyperrectangle - used for dispatch\nn – (optional, default: dim(S)) ambient dimension of the set S\nε – (optional, default: Inf) - used for dispatch, ignored\n\nOutput\n\nThe box approximation of the projection of S.\n\n\n\n\n\nproject(S::LazySet{N},\n        block::AbstractVector{Int},\n        directions::AbstractDirections{N},\n        n::Int\n       )::HPolytope where {N<:Real}\n\nProject a high-dimensional set to a low-dimensional set using template directions.\n\nInput\n\nS – set\nblock – block structure - a vector with the dimensions of interest\ndirections – template directions\nn – (optional, default: dim(S)) ambient dimension of the set S\n\nOutput\n\nThe template direction approximation of the projection of S.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Cartesian-Decomposition-1",
    "page": "Approximations",
    "title": "Cartesian Decomposition",
    "category": "section",
    "text": "decompose\ndefault_block_structure\nproject"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.overapproximate",
    "page": "Approximations",
    "title": "LazySets.Approximations.overapproximate",
    "category": "function",
    "text": "overapproximate(X::S, ::Type{S}) where {S <: LazySet}\n\nOverapproximating a set of type S with type S is a no-op.\n\nInput\n\nX – set\nType{S} – set type\n\nOutput\n\nThe input set.\n\n\n\n\n\noverapproximate(S::LazySet{N},\n                ::Type{<:HPolygon},\n                [ε]::Real=Inf)::HPolygon where {N<:Real}\n\nReturn an approximation of a given 2D convex set. If no error tolerance is given, or is Inf, the result is a box-shaped polygon. Otherwise the result is an ε-close approximation as a polygon.\n\nInput\n\nS           – convex set, assumed to be two-dimensional\nHPolygon    – type for dispatch\nε           – (optional, default: Inf) error bound\n\nOutput\n\nA polygon in constraint representation.\n\n\n\n\n\noverapproximate(S::LazySet, ε::Real)::HPolygon\n\nAlias for overapproximate(S, HPolygon, ε).\n\n\n\n\n\noverapproximate(S::LazySet,\n                Type{<:Hyperrectangle})::Union{Hyperrectangle, EmptySet}\n\nReturn an approximation of a given set as a hyperrectangle.\n\nInput\n\nS              – set\nHyperrectangle – type for dispatch\n\nOutput\n\nA hyperrectangle.\n\n\n\n\n\noverapproximate(S::LazySet)::Union{Hyperrectangle, EmptySet}\n\nAlias for overapproximate(S, Hyperrectangle).\n\n\n\n\n\noverapproximate(S::ConvexHull{N, Zonotope{N}, Zonotope{N}},\n                ::Type{<:Zonotope})::Zonotope where {N<:Real}\n\nOverapproximate the convex hull of two zonotopes.\n\nInput\n\nS           – convex hull of two zonotopes of the same order\nZonotope    – type for dispatch\n\nAlgorithm\n\nThis function implements the method proposed in Reachability of Uncertain Linear Systems Using Zonotopes, A. Girard, HSCC 2005. The convex hull of two zonotopes of the same order, that we write Z_j = c^(j) g^(j)_1  g^(j)_p for j = 1 2, can be overapproximated as follows:\n\nCH(Z_1 Z_2)  frac12c^(1)+c^(2) g^(1)_1+g^(2)_1  g^(1)_p+g^(2)_p c^(1)-c^(2) g^(1)_1-g^(2)_1  g^(1)_p-g^(2)_p\n\nIt should be noted that the output zonotope is not necessarily the minimal enclosing zonotope, which is in general expensive in high dimensions. This is further investigated in: Zonotopes as bounding volumes, L. J. Guibas et al, Proc. of Symposium on Discrete Algorithms, pp. 803-812.\n\n\n\n\n\noverapproximate(X::LazySet,\n                dir::AbstractDirections\n               )::HPolytope\n\nOverapproximating a set with template directions.\n\nInput\n\nX           – set\ndir         – direction representation\n\nOutput\n\nA HPolytope overapproximating the set X with the directions from dir.\n\n\n\n\n\noverapproximate(S::LazySet{N},\n                ::Type{Interval}\n               ) where {N<:Real}\n\nReturn the overapproximation of a real unidimensional set with an interval.\n\nInput\n\nS           – one-dimensional set\nInterval    – type for dispatch\n\nOutput\n\nAn interval.\n\n\n\n\n\noverapproximate(cap::Intersection{N,\n                                  <:LazySet,\n                                  <:Union{AbstractPolytope{N}, HPolyhedron{N}}},\n                dir::AbstractDirections{N};\n                kwargs...\n               ) where {N<:Real}\n\nReturn the overapproximation of the intersection between a compact set and a polytope given a set of template directions.\n\nInput\n\ncap         – intersection of a compact set and a polytope\ndir         – template directions\nkwargs      – additional arguments that are passed to the support function                  algorithm\n\nOutput\n\nA polytope in H-representation such that the normal direction of each half-space is given by an element of dir.\n\nAlgorithm\n\nLet di be a direction drawn from the set of template directions dir. Let X be the compact set and let P be the polytope. We overapproximate the set X ∩ H with a polytope in constraint representation using a given set of template directions dir.\n\nThe idea is to solve the univariate optimization problem ρ(di, X ∩ Hi) for each half-space in the set P and then take the minimum. This gives an overapproximation of the exact support function.\n\nThis algorithm is inspired from G. Frehse, R. Ray. Flowpipe-Guard Intersection for Reachability Computations with Support Functions.\n\nNotes\n\nThis method relies on having available the constraints_list of the polytope P.\n\nThis method of overapproximations can return a non-empty set even if the original intersection is empty.\n\n\n\n\n\noverapproximate(cap::Intersection{N, <:HalfSpace{N}, <:AbstractPolytope{N}},\n                dir::AbstractDirections{N};\n                [kwargs]...\n               ) where {N<:Real}\n\nReturn the overapproximation of the intersection between a half-space and a polytope given a set of template directions.\n\nInput\n\ncap         – intersection of a half-space and a polytope\ndir         – template directions\nkwargs      – additional arguments that are passed to the support function                  algorithm\n\nOutput\n\nA polytope in H-representation such that the normal direction of each half-space is given by an element of dir.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Overapproximations-1",
    "page": "Approximations",
    "title": "Overapproximations",
    "category": "section",
    "text": "overapproximate"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.ballinf_approximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.ballinf_approximation",
    "category": "function",
    "text": "ballinf_approximation(S::LazySet{N};\n                     )::BallInf{N} where {N<:Real}\n\nOverapproximate a convex set by a tight ball in the infinity norm.\n\nInput\n\nS           – convex set\n\nOutput\n\nA tight ball in the infinity norm.\n\nAlgorithm\n\nThe center and radius of the box are obtained by evaluating the support function of the given convex set along the canonical directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation",
    "category": "function",
    "text": "box_approximation(S::LazySet)::Hyperrectangle\n\nOverapproximate a convex set by a tight hyperrectangle.\n\nInput\n\nS           – convex set\n\nOutput\n\nA tight hyperrectangle.\n\nAlgorithm\n\nThe center of the hyperrectangle is obtained by averaging the support function of the given set in the canonical directions, and the lengths of the sides can be recovered from the distance among support functions in the same directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.interval_hull",
    "page": "Approximations",
    "title": "LazySets.Approximations.interval_hull",
    "category": "function",
    "text": "interval_hull\n\nAlias for box_approximation.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation_symmetric",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation_symmetric",
    "category": "function",
    "text": "box_approximation_symmetric(S::LazySet{N}\n                           )::Union{Hyperrectangle{N}, EmptySet{N}}\n                            where {N<:Real}\n\nOverapproximate a convex set by a tight hyperrectangle centered in the origin.\n\nInput\n\nS           – convex set\n\nOutput\n\nA tight hyperrectangle centered in the origin.\n\nAlgorithm\n\nThe center of the box is the origin, and the radius is obtained by computing the maximum value of the support function evaluated at the canonical directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.symmetric_interval_hull",
    "page": "Approximations",
    "title": "LazySets.Approximations.symmetric_interval_hull",
    "category": "function",
    "text": "symmetric_interval_hull\n\nAlias for box_approximation_symmetric.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation_helper",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation_helper",
    "category": "function",
    "text": "box_approximation_helper(S::LazySet{N};\n                        ) where {N<:Real}\n\nCommon code of box_approximation and box_approximation_symmetric.\n\nInput\n\nS           – convex set\n\nOutput\n\nA tuple containing the data that is needed to construct a tightly overapproximating hyperrectangle.\n\nc – center\nr – radius\n\nAlgorithm\n\nThe center of the hyperrectangle is obtained by averaging the support function of the given convex set in the canonical directions. The lengths of the sides can be recovered from the distance among support functions in the same directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Box-Approximations-1",
    "page": "Approximations",
    "title": "Box Approximations",
    "category": "section",
    "text": "ballinf_approximation\nbox_approximation\ninterval_hull\nbox_approximation_symmetric\nsymmetric_interval_hull\nbox_approximation_helper"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.LocalApproximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.LocalApproximation",
    "category": "type",
    "text": "LocalApproximation{N<:Real}\n\nType that represents a local approximation in 2D.\n\nFields\n\np1        – first inner point\nd1        – first direction\np2        – second inner point\nd2        – second direction\nq         – intersection of the lines l1 ⟂ d1 at p1 and l2 ⟂ d2 at p2\nrefinable – states if this approximation is refinable\nerr       – error upper bound\n\nNotes\n\nThe criteria for being refinable are determined in the method new_approx.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.PolygonalOverapproximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.PolygonalOverapproximation",
    "category": "type",
    "text": "PolygonalOverapproximation{N<:Real}\n\nType that represents the polygonal approximation of a convex set.\n\nFields\n\nS            – convex set\napprox_stack – stack of local approximations that still need to be examined\nconstraints  – vector of linear constraints that are already finalized                   (i.e., they satisfy the given error bound)\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.new_approx-Tuple{LazySet,Array{Float64,1},Array{Float64,1},Array{Float64,1},Array{Float64,1}}",
    "page": "Approximations",
    "title": "LazySets.Approximations.new_approx",
    "category": "method",
    "text": "new_approx(S::LazySet, p1::Vector{N}, d1::Vector{N}, p2::Vector{N},\n           d2::Vector{N}) where N<:Real\n\nCreate a LocalApproximation instance for the given excerpt of a polygonal approximation.\n\nInput\n\nS  – convex set\np1 – first inner point\nd1 – first direction\np2 – second inner point\nd2 – second direction\n\nOutput\n\nA local approximation of S in the given directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.addapproximation!-Tuple{LazySets.Approximations.PolygonalOverapproximation,Array{Float64,1},Array{Float64,1},Array{Float64,1},Array{Float64,1}}",
    "page": "Approximations",
    "title": "LazySets.Approximations.addapproximation!",
    "category": "method",
    "text": "addapproximation!(Ω::PolygonalOverapproximation, p1::Vector{N},\n    d1::Vector{N}, p2::Vector{N}, d2::Vector{N}) where N<:Real\n\nInput\n\nΩ  – polygonal overapproximation of a convex set\np1 – first inner point\nd1 – first direction\np2 – second inner point\nd2 – second direction\n\nOutput\n\nThe list of local approximations in Ω of the set Ω.S is updated in-place and the new approximation is returned by this function.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.refine-Tuple{LazySets.Approximations.LocalApproximation,LazySet}",
    "page": "Approximations",
    "title": "LazySets.Approximations.refine",
    "category": "method",
    "text": "refine(approx::LocalApproximation, S::LazySet\n      )::Tuple{LocalApproximation, LocalApproximation}\n\nRefine a given local approximation of the polygonal approximation of a convex set by splitting along the normal direction of the approximation.\n\nInput\n\napprox – local approximation to be refined\nS      – 2D convex set\n\nOutput\n\nThe tuple consisting of the refined right and left local approximations.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.tohrep-Tuple{LazySets.Approximations.PolygonalOverapproximation}",
    "page": "Approximations",
    "title": "LazySets.Approximations.tohrep",
    "category": "method",
    "text": "tohrep(Ω::PolygonalOverapproximation{N})::AbstractHPolygon{N} where N<:Real\n\nConvert a polygonal overapproximation into a concrete polygon.\n\nInput\n\nΩ – polygonal overapproximation of a convex set\n\nOutput\n\nA polygon in constraint representation.\n\nAlgorithm\n\nInternally we keep the constraints sorted. Hence we do not need to use addconstraint! when creating the HPolygon.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.approximate-Tuple{LazySet{Float64},Float64}",
    "page": "Approximations",
    "title": "LazySets.Approximations.approximate",
    "category": "method",
    "text": "approximate(S::LazySet{N},\n            ε::N)::PolygonalOverapproximation{N} where N<:Real\n\nReturn an ε-close approximation of the given 2D convex set (in terms of Hausdorff distance) as an inner and an outer approximation composed by sorted local Approximation2D.\n\nInput\n\nS – 2D convex set\nε – error bound\n\nOutput\n\nAn ε-close approximation of the given 2D convex set.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.constraint-Tuple{LazySets.Approximations.LocalApproximation}",
    "page": "Approximations",
    "title": "LazySets.Approximations.constraint",
    "category": "method",
    "text": "constraint(approx::LocalApproximation)\n\nConvert a local approximation to a linear constraint.\n\nInput\n\napprox – local approximation\n\nOutput\n\nA linear constraint.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Iterative-refinement-1",
    "page": "Approximations",
    "title": "Iterative refinement",
    "category": "section",
    "text": "LocalApproximation\nPolygonalOverapproximation\nnew_approx(::LazySet, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64})\naddapproximation!(::PolygonalOverapproximation, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64})\nrefine(::LocalApproximation, ::LazySet)\ntohrep(::PolygonalOverapproximation)\napproximate(::LazySet{Float64}, ::Float64)\nconstraint(::LocalApproximation)"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.AbstractDirections",
    "page": "Approximations",
    "title": "LazySets.Approximations.AbstractDirections",
    "category": "type",
    "text": "AbstractDirections{N}\n\nAbstract type for template direction representations.\n\nNotes\n\nAll subtypes should implement the standard iterator methods from Base and the function dim(d<:AbstractDirections)::Int.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.BoxDirections",
    "page": "Approximations",
    "title": "LazySets.Approximations.BoxDirections",
    "category": "type",
    "text": "BoxDirections{N} <: AbstractDirections{N}\n\nBox direction representation.\n\nFields\n\nn – dimension\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.OctDirections",
    "page": "Approximations",
    "title": "LazySets.Approximations.OctDirections",
    "category": "type",
    "text": "OctDirections{N} <: AbstractDirections{N}\n\nOctagon direction representation.\n\nFields\n\nn – dimension\n\nNotes\n\nOctagon directions consist of all vectors that are zero almost everywhere except in two dimensions i, j (possibly i = j) where it is 1.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.BoxDiagDirections",
    "page": "Approximations",
    "title": "LazySets.Approximations.BoxDiagDirections",
    "category": "type",
    "text": "BoxDiagDirections{N} <: AbstractDirections{N}\n\nBox-diagonal direction representation.\n\nFields\n\nn – dimension\n\nNotes\n\nBox-diagonal directions can be seen as the union of diagonal directions (all entries are ±1) and box directions (one entry is ±1, all other entries are 0). The iterator first enumerates all diagonal directions, and then all box directions.\n\n\n\n\n\n"
},

{
    "location": "lib/approximations.html#Template-directions-1",
    "page": "Approximations",
    "title": "Template directions",
    "category": "section",
    "text": "AbstractDirections\nBoxDirections\nOctDirections\nBoxDiagDirectionsSee also overapproximate(X::LazySet, dir::AbstractDirections)::HPolytope."
},

{
    "location": "lib/utils.html#",
    "page": "Utility Functions",
    "title": "Utility Functions",
    "category": "page",
    "text": "CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/utils.html#LazySets.sign_cadlag",
    "page": "Utility Functions",
    "title": "LazySets.sign_cadlag",
    "category": "function",
    "text": "sign_cadlag(x::N)::N where {N<:Real}\n\nThis function works like the sign function but is 1 for input 0.\n\nInput\n\nx – real scalar\n\nOutput\n\n1 if x  0, -1 otherwise.\n\nNotes\n\nThis is the sign function right-continuous at zero (see càdlàg function). It can be used with vector-valued arguments via the dot operator.\n\nExamples\n\njulia> import LazySets.sign_cadlag\n\njulia> sign_cadlag.([-0.6, 1.3, 0.0])\n3-element Array{Float64,1}:\n -1.0\n  1.0\n  1.0\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.ispermutation",
    "page": "Utility Functions",
    "title": "LazySets.ispermutation",
    "category": "function",
    "text": "ispermutation(u::AbstractVector{T}, v::AbstractVector{T})::Bool where T\n\nCheck that two vectors contain the same elements up to reordering.\n\nInput\n\nu – first vector\nv – second vector\n\nOutput\n\ntrue iff the vectors are identical up to reordering.\n\nExamples\n\njulia> LazySets.ispermutation([1, 2, 2], [2, 2, 1])\ntrue\n\njulia> LazySets.ispermutation([1, 2, 2], [1, 1, 2])\nfalse\n\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@neutral",
    "page": "Utility Functions",
    "title": "LazySets.@neutral",
    "category": "macro",
    "text": "@neutral(SET, NEUT)\n\nCreate functions to make a lazy set operation commutative with a given neutral element set type.\n\nInput\n\nSET  – lazy set operation type\nNEUT – set type for neutral element\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates four functions (possibly two more if @absorbing has been used in advance) (possibly two or four more if @declare_array_version has been used in advance).\n\nExamples\n\n@neutral(MinkowskiSum, N) creates at least the following functions:\n\nneutral(::MinkowskiSum) = N\nMinkowskiSum(X, N) = X\nMinkowskiSum(N, X) = X\nMinkowskiSum(N, N) = N\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@absorbing",
    "category": "macro",
    "text": "@absorbing(SET, ABS)\n\nCreate functions to make a lazy set operation commutative with a given absorbing element set type.\n\nInput\n\nSET – lazy set operation type\nABS – set type for absorbing element\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates four functions (possibly two more if @neutral has been used in advance) (possibly two or four more if @declare_array_version has been used in advance).\n\nExamples\n\n@absorbing(MinkowskiSum, A) creates at least the following functions:\n\nabsorbing(::MinkowskiSum) = A\nMinkowskiSum(X, A) = A\nMinkowskiSum(A, X) = A\nMinkowskiSum(A, A) = A\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@declare_array_version",
    "page": "Utility Functions",
    "title": "LazySets.@declare_array_version",
    "category": "macro",
    "text": "@declare_array_version(SET, SETARR)\n\nCreate functions to connect a lazy set operation with its array set type.\n\nInput\n\nSET    – lazy set operation type\nSETARR – array set type\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates eight functions (and possibly up to eight more if @neutral/@absorbing has been used in advance for the base and/or array set type).\n\nExamples\n\n@declare_array_version(MinkowskiSum, MinkowskiSumArray) creates at least the following functions:\n\narray_constructor(::MinkowskiSum) = MinkowskiSumArray\nis_array_constructor(::MinkowskiSumArray) = true\nMinkowskiSum!(X, Y)\nMinkowskiSum!(X, arr)\nMinkowskiSum!(arr, X)\nMinkowskiSum!(arr1, arr2)\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#Utility-functions-1",
    "page": "Utility Functions",
    "title": "Utility functions",
    "category": "section",
    "text": "sign_cadlag\nispermutation\n@neutral\n@absorbing\n@declare_array_version"
},

{
    "location": "lib/utils.html#Helpers-for-internal-use-only-1",
    "page": "Utility Functions",
    "title": "Helpers for internal use only",
    "category": "section",
    "text": ""
},

{
    "location": "lib/utils.html#LazySets.@neutral_absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@neutral_absorbing",
    "category": "macro",
    "text": "@neutral_absorbing(SET, NEUT, ABS)\n\nCreate two functions to avoid method ambiguties for a lazy set operation with respect to neutral and absorbing element set types.\n\nInput\n\nSET  – lazy set operation type\nNEUT – set type for neutral element\nABS  – set type for absorbing element\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@neutral_absorbing(MinkowskiSum, N, A) creates the following functions as quoted expressions:\n\nMinkowskiSum(N, A) = A\nMinkowskiSum(A, N) = A\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@array_neutral",
    "page": "Utility Functions",
    "title": "LazySets.@array_neutral",
    "category": "macro",
    "text": "@array_neutral(FUN, NEUT, SETARR)\n\nCreate two functions to avoid method ambiguities for a lazy set operation with respect to the neutral element set type and the array set type.\n\nInput\n\nFUN     – function name\nNEUT    – set type for neutral element\nSETARR  – array set type\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@array_neutral(MinkowskiSum, N, ARR) creates the following functions as quoted expressions:\n\nMinkowskiSum(N, ARR) = ARR\nMinkowskiSum(ARR, N) = ARR\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@array_absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@array_absorbing",
    "category": "macro",
    "text": "@array_absorbing(FUN, ABS, SETARR)\n\nCreate two functions to avoid method ambiguities for a lazy set operation with respect to the absorbing element set type and the array set type.\n\nInput\n\nFUN     – function name\nABS     – set type for absorbing element\nSETARR  – array set type\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@array_absorbing(MinkowskiSum, ABS, ARR) creates the following functions as quoted expressions:\n\nMinkowskiSum(ABS, ARR) = ABS\nMinkowskiSum(ARR, ABS) = ABS\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.get_radius!",
    "page": "Utility Functions",
    "title": "LazySets.get_radius!",
    "category": "function",
    "text": "get_radius!(sih::SymmetricIntervalHull{N},\n            i::Int,\n            n::Int=dim(sih))::N where {N<:Real}\n\nCompute the radius of a symmetric interval hull of a convex set in a given dimension.\n\nInput\n\nsih – symmetric interval hull of a convex set\ni   – dimension in which the radius should be computed\nn   – (optional, default: dim(sih)) set dimension\n\nOutput\n\nThe radius of a symmetric interval hull of a convex set in a given dimension.\n\nAlgorithm\n\nWe ask for the support vector of the underlying set for both the positive and negative unit vector in the dimension i.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.an_element_helper",
    "page": "Utility Functions",
    "title": "LazySets.an_element_helper",
    "category": "function",
    "text": "an_element_helper(hp::Hyperplane{N},\n                  [nonzero_entry_a]::Int)::Vector{N} where {N<:Real}\n\nHelper function that computes an element on a hyperplane\'s hyperplane.\n\nInput\n\nhp – hyperplane\nnonzero_entry_a – (optional, default: computes the first index) index i                      such that hp.a[i] is different from 0\n\nOutput\n\nAn element on a hyperplane.\n\nAlgorithm\n\nWe compute the point on the hyperplane as follows:\n\nWe already found a nonzero entry of a in dimension, say, i.\nWe set xi = b  ai.\nWe set xj = 0 for all j  i.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.σ_helper",
    "page": "Utility Functions",
    "title": "LazySets.σ_helper",
    "category": "function",
    "text": "    σ_helper(d::AbstractVector{N},\n             hp::Hyperplane{N},\n             [halfspace]::Bool=false) where {N<:Real}\n\nReturn the support vector of a hyperplane.\n\nInput\n\nd         – direction\nhp        – hyperplane\nhalfspace – (optional, default: false) true if the support vector should                be computed for a half-space\n\nOutput\n\nThe support vector in the given direction, which is only defined in the following two cases:\n\nThe direction has norm zero.\nThe direction is the hyperplane\'s normal direction.\n\nIn both cases the result is any point on the hyperplane. Otherwise this function throws an error.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.binary_search_constraints",
    "page": "Utility Functions",
    "title": "LazySets.binary_search_constraints",
    "category": "function",
    "text": "binary_search_constraints(d::AbstractVector{N},\n                          constraints::Vector{LinearConstraint{N}},\n                          n::Int,\n                          k::Int;\n                          [choose_lower]::Bool=false\n                         )::Int where {N<:Real}\n\nPerforms a binary search in the constraints.\n\nInput\n\nd            – direction\nconstraints  – constraints\nn            – number of constraints\nk            – start index\nchoose_lower – (optional, default: false) flag for choosing the lower                   index (see the \'Output\' section)\n\nOutput\n\nIn the default setting, the result is the smallest index k such that d <= constraints[k], or n+1 if no such k exists. If the choose_lower flag is set, the result is the largest index k such that constraints[k] < d, which is equivalent to being k-1 in the normal setting.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.nonzero_indices",
    "page": "Utility Functions",
    "title": "LazySets.nonzero_indices",
    "category": "function",
    "text": "nonzero_indices(v::AbstractVector{N})::Vector{Int} where N<:Real\n\nReturn the indices in which a vector is non-zero.\n\nInput\n\nv – vector\n\nOutput\n\nA vector of ascending indices i such that the vector is non-zero in dimension i.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.samedir",
    "page": "Utility Functions",
    "title": "LazySets.samedir",
    "category": "function",
    "text": "samedir(u::AbstractVector{N},\n        v::AbstractVector{N})::Tuple{Bool, Real} where N<:Real\n\nCheck whether two vectors point in the same direction.\n\nInput\n\nu – first vector\nv – second vector\n\nOutput\n\n(true, k) iff the vectors are identical up to a positive scaling factor k, and (false, 0) otherwise.\n\nExamples\n\njulia> LazySets.samedir([1, 2, 3], [2, 4, 6])\n(true, 0.5)\n\njulia> LazySets.samedir([1, 2, 3], [3, 2, 1])\n(false, 0)\n\njulia> LazySets.samedir([1, 2, 3], [-1, -2, -3])\n(false, 0)\n\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets._random_zero_sum_vector",
    "page": "Utility Functions",
    "title": "LazySets._random_zero_sum_vector",
    "category": "function",
    "text": "_random_zero_sum_vector(rng::AbstractRNG, N::Type{<:Real}, n::Int)\n\nCreate a random vector with entries whose sum is zero.\n\nInput\n\nrng – random number generator\nN   – numeric type\nn   – length of vector\n\nOutput\n\nA random vector of random numbers such that all positive entries come first and all negative entries come last, and such that the total sum is zero.\n\nAlgorithm\n\nThis is a preprocessing step of the algorithm here based on P. Valtr. Probability that n random points are in convex position.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.remove_duplicates_sorted!",
    "page": "Utility Functions",
    "title": "LazySets.remove_duplicates_sorted!",
    "category": "function",
    "text": "remove_duplicates_sorted!(v::AbstractVector)\n\nRemove duplicate entries in a sorted vector.\n\nInput\n\nv – sorted vector\n\nOutput\n\nThe input vector without duplicates.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.reseed",
    "page": "Utility Functions",
    "title": "LazySets.reseed",
    "category": "function",
    "text": "reseed(rng::AbstractRNG, seed::Union{Int, Nothing})::AbstractRNG\n\nReset the RNG seed if the seed argument is a number.\n\nInput\n\nrng  – random number generator\nseed – seed for reseeding\n\nOutput\n\nThe input RNG if the seed is nothing, and a reseeded RNG otherwise.\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#Functions-and-Macros-1",
    "page": "Utility Functions",
    "title": "Functions and Macros",
    "category": "section",
    "text": "@neutral_absorbing\n@array_neutral\n@array_absorbing\nget_radius!\nan_element_helper\nσ_helper\nbinary_search_constraints\nnonzero_indices\nsamedir\n_random_zero_sum_vector\nremove_duplicates_sorted!\nreseed"
},

{
    "location": "lib/utils.html#LazySets.CachedPair",
    "page": "Utility Functions",
    "title": "LazySets.CachedPair",
    "category": "type",
    "text": "CachedPair{N} where N\n\nA mutable pair of an index and a vector.\n\nFields\n\nidx – index\nvec – vector\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.Approximations.UnitVector",
    "page": "Utility Functions",
    "title": "LazySets.Approximations.UnitVector",
    "category": "type",
    "text": "UnitVector{T} <: AbstractVector{T}\n\nA lazy unit vector with arbitrary one-element.\n\nFields\n\ni – index of non-zero entry\nn – vector length\nv – non-zero entry\n\n\n\n\n\n"
},

{
    "location": "lib/utils.html#Types-1",
    "page": "Utility Functions",
    "title": "Types",
    "category": "section",
    "text": "CachedPair\nApproximations.UnitVector"
},

{
    "location": "about.html#",
    "page": "About",
    "title": "About",
    "category": "page",
    "text": ""
},

{
    "location": "about.html#About-1",
    "page": "About",
    "title": "About",
    "category": "section",
    "text": "This page contains some general information about this project, and recommendations about contributing.Pages = [\"about.md\"]"
},

{
    "location": "about.html#Contributing-1",
    "page": "About",
    "title": "Contributing",
    "category": "section",
    "text": "If you like this package, consider contributing! You can send bug reports (or fix them and send your code), add examples to the documentation, or propose new features.Below some conventions that we follow when contributing to this package are detailed. For specific guidelines on documentation, see the Documentations Guidelines wiki."
},

{
    "location": "about.html#Branches-and-pull-requests-(PR)-1",
    "page": "About",
    "title": "Branches and pull requests (PR)",
    "category": "section",
    "text": "We use a standard pull request policy: You work in a private branch and eventually add a pull request, which is then reviewed by other programmers and merged into the master branch.Each pull request should be pushed in a new branch with the name of the author followed by a descriptive name, e.g., mforets/my_feature. If the branch is associated to a previous discussion in one issue, we use the name of the issue for easier lookup, e.g., mforets/7."
},

{
    "location": "about.html#Unit-testing-and-continuous-integration-(CI)-1",
    "page": "About",
    "title": "Unit testing and continuous integration (CI)",
    "category": "section",
    "text": "This project is synchronized with Travis CI such that each PR gets tested before merging (and the build is automatically triggered after each new commit). For the maintainability of this project, it is important to understand and fix the failing doctests if they exist. We develop in Julia v0.6.0, but for experimentation we also build on the nightly branch.When you modify code in this package, you should make sure that all unit tests pass. To run the unit tests locally, you should do:$ julia --color=yes test/runtests.jlAlternatively, you can achieve the same from inside the REPL using the following command:julia> Pkg.test(\"LazySets\")We also advise adding new unit tests when adding new features to ensure long-term support of your contributions."
},

{
    "location": "about.html#Contributing-to-the-documentation-1",
    "page": "About",
    "title": "Contributing to the documentation",
    "category": "section",
    "text": "New functions and types should be documented according to our guidelines directly in the source code.You can view the source code documentation from inside the REPL by typing ? followed by the name of the type or function. For example, the following command will print the documentation of the LazySet type:julia> ?LazySetThis documentation you are currently reading is written in Markdown, and it relies on Documenter.jl to produce the HTML layout. The sources for creating this documentation are found in docs/src. You can easily include the documentation that you wrote for your functions or types there (see the Documenter.jl guide or our sources for examples).To generate the documentation locally, run make.jl, e.g., by executing the following command in the terminal:$ julia --color=yes docs/make.jlNote that this also runs all doctests which will take some time."
},

{
    "location": "about.html#Related-projects-1",
    "page": "About",
    "title": "Related projects",
    "category": "section",
    "text": "The project 3PLIB is a Java Library developed by Frédéric Viry, and it is one of the previous works that led to the creation of LazySets.jl. 3PLIB is specialized to planar projections of convex polyhedra. It was initially created to embed this feature in Java applications, and also provides a backend for visualization of high-dimensional reach set approximations computed with SpaceEx."
},

{
    "location": "about.html#Credits-1",
    "page": "About",
    "title": "Credits",
    "category": "section",
    "text": "These persons have contributed to LazySets.jl (in alphabetic order):Tomer Arnon\nMarcelo Forets\nChristian Schilling\nFrédéric ViryWe are also grateful to Goran Frehse for enlightening discussions."
},

]}
