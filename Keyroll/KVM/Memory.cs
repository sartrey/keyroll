using System.Collections.Generic;
using System.IO;
using System.Xml.Linq;

namespace Keyroll.KVM
{
    public class Memory
    {
        public const string MIME = "text/kvm+xml";

        private List<Domain> _Domains
            = new List<Domain>();

        public List<Domain> Domains 
        {
            get { return _Domains; }
        }

        public Domain this[string name] 
        {
            get 
            {
                foreach (var domain in _Domains)
                    if (domain.Name == name)
                        return domain;
                return null; 
            }
        }

        public static Memory Load(Stream stream) 
        {
            var xml = XElement.Load(stream);
            var memory = new Memory();
            foreach (XElement xml_domain in xml.Elements("domain")) 
            {
                var domain = Domain.Parse(xml_domain);
                memory._Domains.Add(domain);
            }
            return memory;
        }

        public XElement ToXML() 
        {
            var xml = new XElement("root");
            foreach (var domain in _Domains)
            {
                var xml_domain = domain.ToXML();
                xml.Add(xml_domain);
            }
            return xml;
        }

        public void AddDomain(Domain domain) 
        {
        }
    }
}
