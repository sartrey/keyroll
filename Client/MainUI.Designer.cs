namespace Keyroll
{
    partial class MainUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.ToolStripSeparator split1;
            System.Windows.Forms.ToolStripSeparator split2;
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainUI));
            this.ColhType = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.LsvAssets = new System.Windows.Forms.ListView();
            this.ColhName = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.BtnSearch = new System.Windows.Forms.ToolStripButton();
            this.TbxTag = new System.Windows.Forms.ToolStripTextBox();
            this.LblSearch = new System.Windows.Forms.ToolStripLabel();
            this.toolbar2 = new System.Windows.Forms.ToolStrip();
            this.panel1 = new System.Windows.Forms.Panel();
            this.BtnExportAsset = new System.Windows.Forms.ToolStripButton();
            this.BtnPreviewAsset = new System.Windows.Forms.ToolStripButton();
            this.BtnRemoveAsset = new System.Windows.Forms.ToolStripButton();
            this.BtnAddAsset = new System.Windows.Forms.ToolStripButton();
            this.BtnSaveStorage = new System.Windows.Forms.ToolStripButton();
            this.BtnCreateStorage = new System.Windows.Forms.ToolStripMenuItem();
            this.BtnLoadStorage = new System.Windows.Forms.ToolStripSplitButton();
            this.toolbar1 = new System.Windows.Forms.ToolStrip();
            split1 = new System.Windows.Forms.ToolStripSeparator();
            split2 = new System.Windows.Forms.ToolStripSeparator();
            this.toolbar2.SuspendLayout();
            this.toolbar1.SuspendLayout();
            this.SuspendLayout();
            // 
            // split1
            // 
            split1.Name = "split1";
            split1.Size = new System.Drawing.Size(6, 31);
            // 
            // split2
            // 
            split2.Name = "split2";
            split2.Size = new System.Drawing.Size(6, 31);
            // 
            // ColhType
            // 
            this.ColhType.Text = "Type";
            this.ColhType.Width = 150;
            // 
            // LsvAssets
            // 
            this.LsvAssets.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.ColhName,
            this.ColhType});
            this.LsvAssets.Dock = System.Windows.Forms.DockStyle.Fill;
            this.LsvAssets.Location = new System.Drawing.Point(0, 56);
            this.LsvAssets.Name = "LsvAssets";
            this.LsvAssets.Size = new System.Drawing.Size(450, 384);
            this.LsvAssets.TabIndex = 10;
            this.LsvAssets.UseCompatibleStateImageBehavior = false;
            this.LsvAssets.View = System.Windows.Forms.View.Details;
            // 
            // ColhName
            // 
            this.ColhName.Text = "Name";
            this.ColhName.Width = 300;
            // 
            // BtnSearch
            // 
            this.BtnSearch.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnSearch.Image = ((System.Drawing.Image)(resources.GetObject("BtnSearch.Image")));
            this.BtnSearch.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnSearch.Name = "BtnSearch";
            this.BtnSearch.Size = new System.Drawing.Size(23, 22);
            this.BtnSearch.Text = "Search";
            this.BtnSearch.ToolTipText = "search by tag";
            // 
            // TbxTag
            // 
            this.TbxTag.Name = "TbxTag";
            this.TbxTag.Size = new System.Drawing.Size(270, 25);
            // 
            // LblSearch
            // 
            this.LblSearch.Name = "LblSearch";
            this.LblSearch.Size = new System.Drawing.Size(30, 22);
            this.LblSearch.Text = "Tag";
            // 
            // toolbar2
            // 
            this.toolbar2.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.toolbar2.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.LblSearch,
            this.TbxTag,
            this.BtnSearch});
            this.toolbar2.Location = new System.Drawing.Point(0, 31);
            this.toolbar2.Name = "toolbar2";
            this.toolbar2.Size = new System.Drawing.Size(450, 25);
            this.toolbar2.TabIndex = 9;
            // 
            // panel1
            // 
            this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panel1.Location = new System.Drawing.Point(0, 440);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(450, 100);
            this.panel1.TabIndex = 8;
            // 
            // BtnExportAsset
            // 
            this.BtnExportAsset.Image = global::Keyroll.Properties.Resources.export_asset;
            this.BtnExportAsset.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnExportAsset.Name = "BtnExportAsset";
            this.BtnExportAsset.Size = new System.Drawing.Size(74, 28);
            this.BtnExportAsset.Text = "Export";
            this.BtnExportAsset.ToolTipText = "export asset";
            // 
            // BtnPreviewAsset
            // 
            this.BtnPreviewAsset.Image = global::Keyroll.Properties.Resources.preview_asset;
            this.BtnPreviewAsset.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnPreviewAsset.Name = "BtnPreviewAsset";
            this.BtnPreviewAsset.Size = new System.Drawing.Size(80, 28);
            this.BtnPreviewAsset.Text = "Preview";
            this.BtnPreviewAsset.ToolTipText = "preview asset";
            // 
            // BtnRemoveAsset
            // 
            this.BtnRemoveAsset.Image = global::Keyroll.Properties.Resources.remove_asset;
            this.BtnRemoveAsset.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRemoveAsset.Name = "BtnRemoveAsset";
            this.BtnRemoveAsset.Size = new System.Drawing.Size(83, 28);
            this.BtnRemoveAsset.Text = "Remove";
            this.BtnRemoveAsset.ToolTipText = "remove asset";
            // 
            // BtnAddAsset
            // 
            this.BtnAddAsset.Image = global::Keyroll.Properties.Resources.add_asset;
            this.BtnAddAsset.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnAddAsset.Name = "BtnAddAsset";
            this.BtnAddAsset.Size = new System.Drawing.Size(60, 28);
            this.BtnAddAsset.Text = "Add";
            this.BtnAddAsset.ToolTipText = "add asset";
            // 
            // BtnSaveStorage
            // 
            this.BtnSaveStorage.Image = global::Keyroll.Properties.Resources.save_storage;
            this.BtnSaveStorage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnSaveStorage.Name = "BtnSaveStorage";
            this.BtnSaveStorage.Size = new System.Drawing.Size(63, 28);
            this.BtnSaveStorage.Text = "Save";
            this.BtnSaveStorage.ToolTipText = "save storage";
            // 
            // BtnCreateStorage
            // 
            this.BtnCreateStorage.Image = global::Keyroll.Properties.Resources.create_storage;
            this.BtnCreateStorage.Name = "BtnCreateStorage";
            this.BtnCreateStorage.Size = new System.Drawing.Size(160, 30);
            this.BtnCreateStorage.Text = "Create...";
            this.BtnCreateStorage.ToolTipText = "create storage";
            this.BtnCreateStorage.Click += new System.EventHandler(this.BtnCreateStorage_Click);
            // 
            // BtnLoadStorage
            // 
            this.BtnLoadStorage.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtnCreateStorage});
            this.BtnLoadStorage.Image = global::Keyroll.Properties.Resources.open_storage;
            this.BtnLoadStorage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnLoadStorage.Name = "BtnLoadStorage";
            this.BtnLoadStorage.Size = new System.Drawing.Size(77, 28);
            this.BtnLoadStorage.Text = "Load";
            this.BtnLoadStorage.ToolTipText = "load storage";
            // 
            // toolbar1
            // 
            this.toolbar1.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.toolbar1.ImageScalingSize = new System.Drawing.Size(24, 24);
            this.toolbar1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtnLoadStorage,
            this.BtnSaveStorage,
            split1,
            this.BtnAddAsset,
            this.BtnRemoveAsset,
            split2,
            this.BtnPreviewAsset,
            this.BtnExportAsset});
            this.toolbar1.Location = new System.Drawing.Point(0, 0);
            this.toolbar1.Name = "toolbar1";
            this.toolbar1.Size = new System.Drawing.Size(450, 31);
            this.toolbar1.TabIndex = 7;
            // 
            // MainUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.LsvAssets);
            this.Controls.Add(this.toolbar2);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.toolbar1);
            this.Name = "MainUI";
            this.Size = new System.Drawing.Size(450, 540);
            this.toolbar2.ResumeLayout(false);
            this.toolbar2.PerformLayout();
            this.toolbar1.ResumeLayout(false);
            this.toolbar1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ColumnHeader ColhType;
        private System.Windows.Forms.ListView LsvAssets;
        private System.Windows.Forms.ColumnHeader ColhName;
        private System.Windows.Forms.ToolStripButton BtnSearch;
        private System.Windows.Forms.ToolStripTextBox TbxTag;
        private System.Windows.Forms.ToolStripLabel LblSearch;
        private System.Windows.Forms.ToolStrip toolbar2;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.ToolStripButton BtnExportAsset;
        private System.Windows.Forms.ToolStripButton BtnPreviewAsset;
        private System.Windows.Forms.ToolStripButton BtnRemoveAsset;
        private System.Windows.Forms.ToolStripButton BtnAddAsset;
        private System.Windows.Forms.ToolStripButton BtnSaveStorage;
        private System.Windows.Forms.ToolStripMenuItem BtnCreateStorage;
        private System.Windows.Forms.ToolStripSplitButton BtnLoadStorage;
        private System.Windows.Forms.ToolStrip toolbar1;
    }
}
