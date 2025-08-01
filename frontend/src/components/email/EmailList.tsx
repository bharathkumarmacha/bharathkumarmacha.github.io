import React, { useState } from 'react';

interface Email {
  id: number;
  subject: string;
  sender: string;
  date: string;
  content: string;
}

const EmailList: React.FC = () => {
  const [emails] = useState<Email[]>([
    {
      id: 1,
      subject: 'Welcome to InfoMerica',
      sender: 'info@infomerica.com',
      date: '2025-05-20',
      content: 'Welcome to our platform!'
    },
    // Add more sample emails as needed
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Inbox</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Sender</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {emails.map((email) => (
              <tr key={email.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{email.subject}</td>
                <td className="px-6 py-4">{email.sender}</td>
                <td className="px-6 py-4">{email.date}</td>
                <td className="px-6 py-4">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailList;
