import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

const OTPForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (
        !/^[0-9]{1}$/.test(e.key)
        && e.key !== 'Backspace'
        && e.key !== 'Delete'
        && e.key !== 'Tab'
        && !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const inputs = formRef.current?.querySelectorAll('input[type=text]') as NodeListOf<HTMLInputElement>;
        const index = Array.from(inputs).indexOf(e.target as HTMLInputElement);
        if (index > 0) {
          inputs[index - 1].value = '';
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e: any) => {
      const { target } = e;
      const inputs = formRef.current?.querySelectorAll('input[type=text]') as NodeListOf<HTMLInputElement>;
      const index = Array.from(inputs).indexOf(target);
      if (target.value && index !== -1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          (formRef.current?.querySelector('button[type=submit]') as HTMLButtonElement).focus();
        }
      }
    };

    const handleFocus = (e: any) => {
      e.target.select();
    };

    const handlePaste = (e: any) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text');
      const inputs = formRef.current?.querySelectorAll('input[type=text]') as NodeListOf<HTMLInputElement>;
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split('');
      inputs.forEach((input, index) => input.value = digits[index]);
      (formRef.current?.querySelector('button[type=submit]') as HTMLButtonElement).focus();
    };

    const form = formRef.current;
    if (form) {
      const inputs = form.querySelectorAll('input[type=text]');
      inputs.forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('paste', handlePaste);
      });
    }

    return () => {
      const inputs = formRef.current?.querySelectorAll('input[type=text]');
      if (inputs) {
        inputs.forEach(input => {
          input.removeEventListener('input', handleInput);
          input.removeEventListener('keydown', handleKeyDown);
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('paste', handlePaste);
        });
      }
    };
  }, []);

  const handleSubmit = (values: { [key: string]: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // Handle submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (

      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
                <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
              </header>
              <Formik
                initialValues={{
                  digit1: '',
                  digit2: '',
                  digit3: '',
                  digit4: ''
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form ref={formRef} id="otp-form">
                    <div className="flex items-center justify-center gap-3">
                      <Field
                        type="text"
                        name="digit1"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                      />
                      <Field
                        type="text"
                        name="digit2"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                      />
                      <Field
                        type="text"
                        name="digit3"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                      />
                      <Field
                        type="text"
                        name="digit4"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength={1}
                      />
                    </div>
                    <div className="max-w-[260px] mx-auto mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      >
                        Verify Account
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-sm text-slate-500 mt-4">Didn't receive code? <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Resend</a></div>
            </div>
          </div>
        </div>
      </main>

  );
};

export default OTPForm;