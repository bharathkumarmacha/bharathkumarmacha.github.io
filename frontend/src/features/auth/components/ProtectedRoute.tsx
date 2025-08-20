import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { UserRole, SubscriptionTier } from '../../../types/auth';
import { AuthService } from '../../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredSubscription?: SubscriptionTier;
  requiredFeatures?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredSubscription,
  requiredFeatures = [],
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      AuthService.hasRole(user, role)
    );
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check subscription requirements
  if (requiredSubscription) {
    const tierLevels = { free: 0, pro: 1, enterprise: 2 };
    const userTierLevel = tierLevels[user.subscription.tier];
    const requiredTierLevel = tierLevels[requiredSubscription];
    
    if (userTierLevel < requiredTierLevel) {
      return <Navigate to="/upgrade" replace />;
    }
  }

  // Check feature requirements
  if (requiredFeatures.length > 0) {
    const hasRequiredFeatures = requiredFeatures.every(feature =>
      AuthService.hasSubscriptionFeature(user, feature)
    );
    
    if (!hasRequiredFeatures) {
      return <Navigate to="/upgrade" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
