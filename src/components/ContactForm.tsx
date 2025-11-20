// src/components/ContactForm.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  message: string;
}

type SubmitStatus = "success" | "error" | null;

interface ValidationErrors {
  email?: string;
  phone?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationErrors({});

    // Validate inputs
    const errors: ValidationErrors = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number (at least 10 digits)";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...formData,
          subject: `New Quote Request from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          serviceType: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-dark to-darkest"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Get Your Free Estimate Today
          </h2>
          <p className="text-xl text-slate-300">
            Fill out the form below and we'll get back to you within 24 hours
            with a detailed quote for your project.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Side */}
            <div className="lg:col-span-2">
              <div className="bg-dark rounded-2xl shadow-xl p-8 border border-slate-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-slate-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border bg-darkest border-slate-600 text-slate-200 focus:border-accent focus:ring-2 focus:ring-yellow-400/50 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-slate-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border bg-darkest text-slate-200 focus:ring-2 outline-none transition ${
                          validationErrors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-400/50"
                            : "border-slate-600 focus:border-accent focus:ring-yellow-400/50"
                        }`}
                        placeholder="john@example.com"
                        aria-invalid={validationErrors.email ? "true" : "false"}
                        aria-describedby={
                          validationErrors.email ? "email-error" : undefined
                        }
                      />
                      {validationErrors.email && (
                        <p
                          id="email-error"
                          className="text-red-400 text-sm mt-1"
                        >
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-slate-300 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border bg-darkest text-slate-200 focus:ring-2 outline-none transition ${
                          validationErrors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-400/50"
                            : "border-slate-600 focus:border-accent focus:ring-yellow-400/50"
                        }`}
                        placeholder="(555) 555-1234"
                        aria-invalid={validationErrors.phone ? "true" : "false"}
                        aria-describedby={
                          validationErrors.phone ? "phone-error" : undefined
                        }
                      />
                      {validationErrors.phone && (
                        <p
                          id="phone-error"
                          className="text-red-400 text-sm mt-1"
                        >
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-semibold text-slate-300 mb-2"
                      >
                        Address/City *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border bg-darkest border-slate-600 text-slate-200 focus:border-accent focus:ring-2 focus:ring-yellow-400/50 outline-none transition"
                        placeholder="Louisville, KY"
                      />
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Type of Service *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border bg-darkest border-slate-600 text-slate-200 focus:border-accent focus:ring-2 focus:ring-yellow-400/50 outline-none transition"
                    >
                      <option value="">Select a service...</option>
                      <option value="interior-exterior">
                        Interior & Exterior Painting
                      </option>
                      <option value="residential-commercial">
                        Residential & Commercial
                      </option>
                      <option value="house-office-business">
                        House, Office & Business Painting
                      </option>
                      <option value="pressure-washing">Pressure Washing</option>
                      <option value="deck-staining">
                        Deck Staining & Sealing
                      </option>
                      <option value="fences-railings">Fences & Railings</option>
                      <option value="review">Review</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border bg-darkest border-slate-600 text-slate-200 focus:border-accent focus:ring-2 focus:ring-yellow-400/50 outline-none transition resize-none"
                      placeholder="Tell us about your project... (room size, number of rooms, etc.)"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-darkest py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Estimate</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages with ARIA live regions */}
                  <div role="status" aria-live="polite" aria-atomic="true">
                    {submitStatus === "success" && (
                      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-start space-x-3">
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            Thank you for your request!
                          </p>
                          <p className="text-sm">
                            We'll contact you within 24 hours with your free
                            estimate.
                          </p>
                        </div>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start space-x-3">
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            Oops! Something went wrong.
                          </p>
                          <p className="text-sm">
                            Please try again or call us directly at (812) 557
                            3291
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-slate-400 text-center">
                    We respect your privacy and will never share your
                    information.
                  </p>
                </form>
              </div>
            </div>

            {/* Info Side */}
            <div className="space-y-6">
              {/* Response Time */}
              <div className="bg-accent text-darkest rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">Fast Response</h3>
                </div>
                <p className="text-yellow-900">
                  We respond to all estimate requests within 24 hours, often
                  much sooner!
                </p>
              </div>

              {/* Free Estimates */}
              <div className="bg-dark rounded-2xl p-6 shadow-lg border border-slate-700">
                <div className="flex items-center space-x-3 mb-4">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-slate-100">
                    Free Estimates
                  </h3>
                </div>
                <p className="text-slate-300">
                  All estimates are completely free with no obligation to
                  proceed.
                </p>
              </div>

              {/* What to Expect */}
              <div className="bg-dark rounded-2xl p-6 shadow-lg border border-slate-700">
                <h3 className="text-xl font-bold text-slate-100 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-300">
                      Quick response within 24 hours
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-300">
                      On-site visit if needed
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-300">
                      Detailed written quote
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-300">
                      No pressure to commit
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
