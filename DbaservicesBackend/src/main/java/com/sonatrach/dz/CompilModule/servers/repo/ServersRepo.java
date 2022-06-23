package com.sonatrach.dz.CompilModule.servers.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.sonatrach.dz.CompilModule.servers.domain.Servers;


@Repository
public interface ServersRepo  extends JpaRepository<Servers, Integer >{

}
