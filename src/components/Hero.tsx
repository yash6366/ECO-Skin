
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Upload, TrendingUp, Sparkles, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const trends = [
    {
      category: "Skincare",
      title: "Fermented Beauty",
      description: "Products containing fermented ingredients like kombucha and rice water gaining popularity for their enhanced potency.",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      category: "Makeup",
      title: "Skinimalism",
      description: "The 'less is more' approach focusing on enhancing natural beauty with fewer, multi-purpose products.",
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      category: "Fashion",
      title: "Sustainable Fabrics",
      description: "Eco-conscious materials like organic cotton, hemp, and recycled fibers becoming mainstream in fashion.",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section 
      className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-skin-50 to-blush-50"
      ref={heroRef}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-100 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blush-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between pt-16 md:pt-24 lg:pt-32 h-full gap-8">
          <div className="w-full md:w-1/2 space-y-6 transition-all duration-1000 ease-out opacity-0 translate-y-10 animate-fade-up">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-skin-600 bg-skin-100 rounded-full">
              AI-Powered Beauty Assistant
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight tracking-tight">
              Discover Your <span className="text-primary">Unique Beauty</span> With Advanced Analysis
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg">
              Upload your photo or take a picture for instant skin analysis and personalized eco-friendly
              beauty treatments tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                asChild
              >
                <Link to="/analysis">
                  <Camera className="mr-2 h-5 w-5" />
                  Analyze My Skin
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link to="/recommendations">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center pt-10 md:pt-0 transition-all duration-1000 ease-out delay-300 opacity-0 translate-y-10 animate-fade-up">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blush-200 to-skin-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="glass-card relative h-full rounded-3xl overflow-hidden p-4 backdrop-blur-xl">
                <div className="h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-skin-100 to-blush-100 flex flex-col items-center justify-center p-8 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Eco-friendly beauty" 
                    className="w-full h-full object-cover rounded-xl opacity-70 absolute inset-0"
                  />
                  <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-xl">
                    <div className="mb-6 p-4 rounded-full bg-white/70">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Drag and drop your photo here or click to browse files
                    </p>
                    <Button className="rounded-full bg-white hover:bg-white/90 text-primary">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 mb-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              Latest Beauty & Fashion Trends
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the newest sustainable trends in skincare, cosmetics, and fashion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {trends.map((trend, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-lg opacity-0 translate-y-10"
                style={{ animationDelay: `${index * 100 + 800}ms`, animationFillMode: 'forwards', animationName: 'fadeUp', animationDuration: '1s' }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={trend.image} 
                    alt={trend.title} 
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-skin-100 text-skin-700 rounded-full">
                      {trend.category}
                    </span>
                    {trend.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {trend.description}
                  </p>
                  <Link to="/blog" className="text-primary text-sm font-medium hover:underline flex items-center">
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto mb-10 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {['Advanced AI Analysis', 'Personalized Recommendations', 'Eco-Friendly Treatments', 'Expert Support'].map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-4 transition-all duration-500 ease-out opacity-0 translate-y-10"
                style={{ animationDelay: `${index * 100 + 1200}ms`, animationFillMode: 'forwards', animationName: 'fadeUp', animationDuration: '1s' }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary/10">
                    <span className="text-primary font-medium">{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-semibold">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
