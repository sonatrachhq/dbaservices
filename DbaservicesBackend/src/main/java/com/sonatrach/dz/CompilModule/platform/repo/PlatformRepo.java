package com.sonatrach.dz.CompilModule.platform.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sonatrach.dz.CompilModule.platform.domain.Platform;

@Repository
public interface PlatformRepo extends JpaRepository<Platform, Integer>{

}
