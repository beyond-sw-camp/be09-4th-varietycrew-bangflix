provider "kubernetes" {
  config_path = "~/.kube/config"  # kubeconfig 파일 경로
}

# Web Deployment
resource "kubernetes_deployment" "web_deploy" {
  metadata {
    name = "web-deploy"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "web-server-kube"
      }
    }

    template {
      metadata {
        labels = {
          app = "web-server-kube"
        }
      }

      spec {
        container {
          name  = "nginx-prod-container"
          image = "rlfgks/bangflix-web:latest"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

# Web Service
resource "kubernetes_service" "web_service" {
  metadata {
    name = "web-service"
  }

  spec {
    type = "ClusterIP"

    port {
      port       = 8000
      target_port = 80
    }

    selector = {
      app = kubernetes_deployment.web_deploy.spec[0].template[0].metadata[0].labels["app"]
    }
  }
}

# MariaDB Deployment
resource "kubernetes_deployment" "mariadb_deploy" {
  metadata {
    name = "mariadb-deploy"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "mariadb-kube"
      }
    }

    template {
      metadata {
        labels = {
          app = "mariadb-kube"
        }
      }

      spec {
        container {
          name  = "mariadb-prod-container"
          image = "rlfgks/bangflix-mariadb:latest"

          env {
            name  = "MYSQL_ROOT_PASSWORD"
            value = "rootpassword"
          }

          port {
            container_port = 3306
          }
        }
      }
    }
  }
}

# MariaDB Service
resource "kubernetes_service" "mariadb_service" {
  metadata {
    name = "mariadb-service"
  }

  spec {
    type = "ClusterIP"

    port {
      port       = 3306
      target_port = 3306
    }

    selector = {
      app = kubernetes_deployment.mariadb_deploy.spec[0].template[0].metadata[0].labels["app"]
    }
  }
}

# Spring Boot Deployment
resource "kubernetes_deployment" "springboot_deploy" {
  metadata {
    name = "springboot-deploy"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "server-kube"
      }
    }

    template {
      metadata {
        labels = {
          app = "server-kube"
        }
      }

      spec {
        container {
          name  = "springboot-prod-container"
          image = "rlfgks/bangflix-springboot:latest"

          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

# Spring Boot Service
resource "kubernetes_service" "springboot_service" {
  metadata {
    name = "springboot-service"
  }

  spec {
    type = "ClusterIP"

    port {
      port       = 8001
      target_port = 8080
    }

    selector = {
      app = kubernetes_deployment.springboot_deploy.spec[0].template[0].metadata[0].labels["app"]
    }
  }
}

# Redis Deployment
resource "kubernetes_deployment" "redis_deploy" {
  metadata {
    name = "redis-deploy"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "redis-kube"
      }
    }

    template {
      metadata {
        labels = {
          app = "redis-kube"
        }
      }

      spec {
        container {
          name  = "redis-prod-container"
          image = "rlfgks/bangflix-redis:latest"

          port {
            container_port = 6379
          }
        }
      }
    }
  }
}

# Redis Service
resource "kubernetes_service" "redis_service" {
  metadata {
    name = "redis-service"
  }

  spec {
    type = "ClusterIP"

    port {
      port       = 6379
      target_port = 6379
    }

    selector = {
      app = kubernetes_deployment.redis_deploy.spec[0].template[0].metadata[0].labels["app"]
    }
  }
}
resource "kubernetes_ingress_v1" "varc_ingress" {
  metadata {
    name = "varc-ingress"
    annotations = {
      "nginx.ingress.kubernetes.io/ssl-redirect" = "false"
      "nginx.ingress.kubernetes.io/rewrite-target" = "/$2"
    }
  }

  spec {
    ingress_class_name = "nginx"  # Ingress 클래스 지정

    rule {
      http {
        path {
          path     = "/()(.*)"
          path_type = "ImplementationSpecific"  # API 버전에 따라 다를 수 있음

          backend {
            service {
              name = kubernetes_service.web_service.metadata[0].name
              port {
                number = 8000
              }
            }
          }
        }

        path {
          path     = "/server(/|$)(.*)"
          path_type = "ImplementationSpecific"  # API 버전에 따라 다를 수 있음

          backend {
            service {
              name = kubernetes_service.springboot_service.metadata[0].name
              port {
                number = 8001
              }
            }
          }
        }
      }
    }
  }
}
