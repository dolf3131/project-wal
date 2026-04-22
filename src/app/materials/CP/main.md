# A Brief Introduction to Computational Physics

**Jeongbin Jo**  
*Department of Physics, Yonsei University, Seoul, 03722, Republic of Korea*

---

> **Abstract**
> This report provides a comprehensive overview of fundamental topics covered in the PHY3109 Computational Physics course. Computational physics sits at the intersection of physics, computer science, and applied mathematics, offering numerical methods to solve complex physical systems where analytical solutions are intractable. We explore core numerical techniques including numerical integration, statistical data analysis, curve fitting, and the propagation of uncertainty.

## 1. Introduction

Physics traditionally relies on theoretical derivation and experimental observation. However, as physical models encompass realistic boundary conditions, external non-linear perturbations, and many-body interactions, their mathematical representations rapidly elude exact analytical solutions. Computational physics bridges this gap between theoretical formulation and empirical data by mapping continuous differential and integral equations into discrete numerical algorithms that are solvable computationally. 

## 2. Numerical Integration Algorithms

Evaluating the definite integral $I = \int_{a}^{b} f(x) \, dx$ is a persistent requirement. When analytical antiderivatives do not exist or are prohibitively complex, numerical quadratures and probabilistic methods are deployed.

### 2.1 Newton-Cotes Quadrature and Simpson's Rule
Deterministic grid-based algorithms approximate the integration domain $[a, b]$ into evenly spaced sub-intervals defined by a step size $h = \frac{b-a}{N}$. By utilizing the Taylor series expansion at the midpoint $x_1$ between $[x_0, x_2]$, integrating the quadratic interpolation yields:
$$
\int_{x_0}^{x_2} f(x) \, dx \approx \frac{h}{3} \left[ f(x_0) + 4f(x_1) + f(x_2) \right]
$$

When generalized across $N$ (even) contiguous intervals, the composite Simpson's $\frac{1}{3}$ formula is derived:
$$
\int_{a}^{b} f(x) \, dx \approx \frac{h}{3} \Bigg[ f(x_0) + f(x_N) + 4\sum_{i=1,3,5}^{N-1} f(x_i) + 2\sum_{j=2,4,6}^{N-2} f(x_j) \Bigg]
$$

The precision converges as $1/\sqrt{N}$, rendering Monte Carlo unconditionally superior for systems involving massive degrees of freedom, such as statistical mechanics ensembles.

## 3. Statistical Data Analysis and Optimization Framework

### 3.1 Least Squares Method ($\chi^2$ Minimization)
To construct a theoretical model $f(x; \vec{\theta})$ that maximally matches the empirical data, one formulates an objective function representing the square of the deviations:
$$
\chi^2(\vec{\theta}) = \sum_{i=1}^{N} \left[ \frac{y_i - f(x_i; \vec{\theta})}{\sigma_i} \right]^2
$$
The aim of regression modeling is strictly to discover the parameter vector $\vec{\theta}$ that minimizes this multidimensional $\chi^2$ landscape. 

## 4. Conclusion

The mathematical engines examined—ranging from stochastic sampling to tensor error optimization, discrete calculus, and trigonometric transforms—construct the structural paradigms of modern physical research. These formal tools enable scientists to interrogate computational limits, seamlessly simulating unreplicable high-energy boundary conditions or complex multi-variate statistical fields where analytical mathematics entirely breakdown.
