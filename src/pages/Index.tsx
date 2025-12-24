import { useState } from 'react';
import { RoleSelection } from '@/components/RoleSelection';
import { ChatInterface } from '@/components/ChatInterface';
import { RoleInfo } from '@/types/roles';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);

  if (selectedRole) {
    return (
      <ChatInterface
        role={selectedRole}
        onBack={() => setSelectedRole(null)}
      />
    );
  }

  return <RoleSelection onSelectRole={setSelectedRole} />;
};

export default Index;
