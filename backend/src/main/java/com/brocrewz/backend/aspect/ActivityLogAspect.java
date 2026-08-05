package com.brocrewz.backend.aspect;

import com.brocrewz.backend.service.ActivityLogService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Aspect
@Component
public class ActivityLogAspect {

    @Autowired
    private ActivityLogService activityLogService;

    @Pointcut("execution(* com.brocrewz.backend.controller.AdminSettingsController.*(..))")
    public void adminSettingsMethods() {}

    @AfterReturning(pointcut = "adminSettingsMethods() && @annotation(postMapping)", returning = "result", argNames = "joinPoint,postMapping,result")
    public void logPostActivity(JoinPoint joinPoint, PostMapping postMapping, Object result) {
        logActivity(joinPoint, "CREATED/UPDATED");
    }

    @AfterReturning(pointcut = "adminSettingsMethods() && @annotation(putMapping)", returning = "result", argNames = "joinPoint,putMapping,result")
    public void logPutActivity(JoinPoint joinPoint, PutMapping putMapping, Object result) {
        logActivity(joinPoint, "UPDATED");
    }

    @AfterReturning(pointcut = "adminSettingsMethods() && @annotation(deleteMapping)", returning = "result", argNames = "joinPoint,deleteMapping,result")
    public void logDeleteActivity(JoinPoint joinPoint, DeleteMapping deleteMapping, Object result) {
        logActivity(joinPoint, "DELETED");
    }

    private void logActivity(JoinPoint joinPoint, String action) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = (auth != null && auth.isAuthenticated()) ? auth.getName() : "System";
        String methodName = joinPoint.getSignature().getName();
        String entityType = methodName.replaceAll("^(create|update|delete)", "");
        activityLogService.logActivity(user, action, entityType, methodName);
    }
}
