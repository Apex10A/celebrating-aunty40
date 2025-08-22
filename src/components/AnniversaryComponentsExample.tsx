import React, { useState } from 'react';
import { Heart, Gift, Calendar } from 'lucide-react';
import AnniversaryInput from './AnniversaryInput';
import AnniversarySelect from './AnniversarySelect';
import AnniversaryDropdown from './AnniversaryDropdown';
import AnniversaryModal from './AnniversaryModal';
import AnniversaryLoading from './AnniversaryLoading';
import AnniversaryButton from './AnniversaryButton';

export const AnniversaryComponentsExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const guestOptions = [
    { value: 1, label: '1 Guest' },
    { value: 2, label: '2 Guests' },
    { value: 3, label: '3 Guests' },
    { value: 4, label: '4 Guests' },
    { value: 5, label: '5+ Guests' },
  ];

  const eventOptions = [
    { value: 'dinner', label: 'Anniversary Dinner', icon: <Heart className="w-4 h-4" /> },
    { value: 'party', label: 'Celebration Party', icon: <Gift className="w-4 h-4" /> },
    { value: 'ceremony', label: 'Renewal Ceremony', icon: <Calendar className="w-4 h-4" /> },
  ];

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#FFD700] text-center mb-12">
          Anniversary Components Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#FFD700]">Inputs</h2>
            <AnniversaryInput
              label="Full Name"
              placeholder="Enter your name"
              value={inputValue}
              onChange={setInputValue}
              required
            />

            {/* <AnniversaryInput
              label="Message"
              placeholder="Your anniversary message..."
              value={inputValue}
              onChange={setInputValue}
              multiline
              rows={4}
            />

            <AnniversarySelect
              label="Number of Guests"
              options={guestOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Select guest count"
            /> */}

            {/* <AnniversaryDropdown
              label="Event Type"
              options={eventOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="Choose event type"
              searchable
            /> */}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#FFD700]">Buttons & Loading</h2>
            
            <div className="space-y-4">
              <AnniversaryButton
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                loading={isLoading}
                icon={<Heart className="w-4 h-4" />}
              >
                Submit RSVP
              </AnniversaryButton>

              <AnniversaryButton
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </AnniversaryButton>

              <AnniversaryButton
                variant="outline"
                size="sm"
              >
                Small Outline
              </AnniversaryButton>

              <AnniversaryButton
                variant="ghost"
                icon={<Gift className="w-4 h-4" />}
                iconPosition="right"
              >
                Ghost Button
              </AnniversaryButton>
            </div>

            {/* Loading Examples */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#FFD700]">Loading States</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/50 rounded-lg">
                  <p className="text-[#FFD700] text-sm mb-2">Dots</p>
                  <AnniversaryLoading variant="dots" size="md" />
                </div>
                
                <div className="p-4 bg-black/50 rounded-lg">
                  <p className="text-[#FFD700] text-sm mb-2">Spinner</p>
                  <AnniversaryLoading variant="spinner" size="md" />
                </div>
                
                <div className="p-4 bg-black/50 rounded-lg">
                  <p className="text-[#FFD700] text-sm mb-2">Pulse</p>
                  <AnniversaryLoading variant="pulse" size="md" />
                </div>
                
                <div className="p-4 bg-black/50 rounded-lg">
                  <p className="text-[#FFD700] text-sm mb-2">Bars</p>
                  <AnniversaryLoading variant="bars" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Example */}
        <AnniversaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Anniversary Celebration"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-[#FFD700]">
              Thank you for joining our 40th Anniversary celebration! 
              Your presence makes this milestone even more special.
            </p>
            
            <div className="flex items-center gap-2 text-[#FFD700]/70">
              <Heart className="w-4 h-4" />
              <span>With love and gratitude</span>
            </div>
            
            <div className="flex gap-3 mt-6">
              <AnniversaryButton
                variant="primary"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </AnniversaryButton>
              <AnniversaryButton
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </AnniversaryButton>
            </div>
          </div>
        </AnniversaryModal>
      </div>
    </div>
  );
};

export default AnniversaryComponentsExample;