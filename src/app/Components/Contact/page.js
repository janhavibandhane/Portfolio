"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiUser,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineSparkles
} from "react-icons/hi";
import ContactImg from "../../../../public/img/contact-img.svg";

export default function Contact() {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send Message");
  const [status, setStatus] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const onFormUpdate = (category, value) => {
    setFormDetails({ ...formDetails, [category]: value });
    // Clear status when user starts typing again
    if (status.message) {
      setStatus({});
    }
  };

  const validateForm = () => {
    if (!formDetails.firstName.trim()) return "First name is required";
    if (!formDetails.lastName.trim()) return "Last name is required";
    if (!formDetails.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formDetails.email)) return "Invalid email format";
    if (!formDetails.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setStatus({ success: false, message: validationError });
      return;
    }

    setIsSubmitting(true);
    setButtonText("Sending...");
    
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus({ 
          success: true, 
          message: "✨ Message sent successfully! I'll get back to you soon." 
        });
        setFormDetails(formInitialDetails);
      } else {
        setStatus({
          success: false,
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
      setButtonText("Send Message");
      
      // Auto-hide success message after 5 seconds
      if (status.success) {
        setTimeout(() => setStatus({}), 5000);
      }
    }
  };

  const contactInfo = [
    { 
      icon: HiOutlineMail, 
      label: "Email", 
      value: "janhavibandhane@email.com",
      link: "mailto:janhavibandhane@email.com",
      color: "from-blue-400 to-blue-600"
    },
   
    { 
      icon: HiOutlineLocationMarker, 
      label: "Location", 
      value: "Mumbai, India",
      color: "from-emerald-400 to-emerald-600"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0a0a0c] to-[#030304]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Contact Info & Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full"
          >
            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-white/80 mb-6 flex items-center gap-3">
                <HiOutlineSparkles className="w-5 h-5 text-purple-400" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="group"
                    >
                      {info.link ? (
                        <Link href={info.link} className="block">
                          <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${info.color} p-0.5`}>
                              <div className="w-full h-full rounded-lg bg-[#1a1a1f] flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">{info.label}</p>
                              <p className="text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors">
                                {info.value}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${info.color} p-0.5`}>
                            <div className="w-full h-full rounded-lg bg-[#1a1a1f] flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">{info.label}</p>
                            <p className="text-sm sm:text-base text-white">{info.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="relative mt-8"
            >
              <div className="relative w-full max-w-md mx-auto">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-3xl"
                />
                <div className="relative z-10">
                  <Image
                    src={ContactImg}
                    alt="Contact Us"
                    width={500}
                    height={500}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-b from-[#1a1a1f] to-[#0f0f13] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <FiSend className="w-5 h-5 text-blue-400" />
                Send a Message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="relative group">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      value={formDetails.firstName}
                      placeholder="First Name"
                      onChange={(e) => onFormUpdate("firstName", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative group">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      value={formDetails.lastName}
                      placeholder="Last Name"
                      onChange={(e) => onFormUpdate("lastName", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="relative group">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="email"
                      value={formDetails.email}
                      placeholder="Email Address"
                      onChange={(e) => onFormUpdate("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative group">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
                    <input
                      type="tel"
                      value={formDetails.phone}
                      placeholder="Phone Number"
                      onChange={(e) => onFormUpdate("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div variants={itemVariants} className="relative group">
                  <textarea
                    rows="5"
                    value={formDetails.message}
                    placeholder="Your Message"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    required
                  />
                </motion.div>

                {/* Status Message */}
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      status.success 
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.success ? (
                      <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 group ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Form Note */}
                <motion.p 
                  variants={itemVariants}
                  className="text-xs text-center text-gray-500 mt-4"
                >
                  I'll get back to you within 24-48 hours
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}